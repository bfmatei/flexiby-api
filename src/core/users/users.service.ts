import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Observable, combineLatest, from, throwError, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Repository } from 'typeorm';

import { UserInsertDto } from './dto/user-insert.dto';
import { UserDto } from './dto/user.dto';

import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  private readonly passwordRounds: number;

  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService
  ) {
    this.passwordRounds = Number(
      this.configService.get<string>('PASSWORD_ROUNDS')
    );
  }

  existsByUsername(username: string): Observable<boolean> {
    return from(
      this.userRepository.count({
        where: {
          username
        }
      })
    ).pipe(map((count) => count > 0));
  }

  existsByEmail(email: string): Observable<boolean> {
    return from(
      this.userRepository.count({
        where: {
          email
        }
      })
    ).pipe(map((count) => count > 0));
  }

  insert(user: UserInsertDto): Observable<UserDto> {
    const existsByEmail$ = from(this.existsByEmail(user.email));
    const existsByUsername$ = from(this.existsByUsername(user.username));

    return combineLatest([existsByEmail$, existsByUsername$]).pipe(
      switchMap(([emailUsed, usernameUsed]) => {
        if (emailUsed) {
          return throwError(new BadRequestException('Email is used'));
        }

        if (usernameUsed) {
          return throwError(new BadRequestException('Username is used'));
        }

        return of(true);
      }),
      switchMap(() =>
        from(bcrypt.genSalt(this.passwordRounds)).pipe(
          switchMap((password) =>
            from(bcrypt.hash(user.password, password)).pipe(
              switchMap((encodedPassword) =>
                from(
                  this.userRepository.save(
                    this.userRepository.create({
                      ...user,
                      password: encodedPassword
                    })
                  )
                ).pipe(map((userEntity) => this.entityToDto(userEntity)))
              )
            )
          )
        )
      )
    );
  }

  findOneById(id: string): Observable<UserEntity> {
    return from(
      this.userRepository.findOne({
        where: {
          id
        }
      })
    );
  }

  findOneByUsername(username: string): Observable<UserEntity> {
    return from(
      this.userRepository.findOne({
        where: {
          username
        }
      })
    );
  }

  entityToDto(user: UserEntity): UserDto {
    return user
      ? {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username
        }
      : null;
  }
}
