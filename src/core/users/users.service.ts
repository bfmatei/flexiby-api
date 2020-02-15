import { Injectable, ValidationError } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Observable, combineLatest, from, of, throwError } from 'rxjs';
import { map, switchAll, switchMap } from 'rxjs/operators';
import { Repository } from 'typeorm';

import { ValidationException } from '../exceptions/validation-exception';

import { UserInsertDto } from './dto/user-insert.dto';
import { UserDto } from './dto/user.dto';

import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  private readonly passwordRounds: number;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService
  ) {
    this.passwordRounds = Number(this.configService.get<string>('PASSWORD_ROUNDS'));
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

  createUsedValidationException(property: string): ValidationError {
    return {
      property,
      target: null,
      children: [],
      value: null,
      constraints: {
        used: null
      }
    };
  }

  insert(user: UserInsertDto): Observable<UserDto> {
    const existsByEmail$ = from(this.existsByEmail(user.email));
    const existsByUsername$ = from(this.existsByUsername(user.username));

    return combineLatest([existsByEmail$, existsByUsername$]).pipe(
      switchMap(([emailUsed, usernameUsed]) => {
        const validations = [];

        if (emailUsed) {
          validations.push(this.createUsedValidationException('email'));
        }

        if (usernameUsed) {
          validations.push(this.createUsedValidationException('username'));
        }

        if (validations.length > 0) {
          return throwError(new ValidationException(validations));
        }

        return of(true);
      }),
      switchMap(() =>
        from(bcrypt.genSalt(this.passwordRounds)).pipe(
          map((salt) => from(bcrypt.hash(user.password, salt))),
          switchAll(),
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

  findOneByUsernameAndPassword(username: string, password: string): Observable<UserEntity> {
    return from(
      this.userRepository.findOne({
        where: {
          username
        }
      })
    ).pipe(
      switchMap((userEntity) => {
        if (!userEntity) {
          return of(null);
        }

        return from(bcrypt.compare(password, userEntity.password)).pipe(
          map((passwordMatch) => (!passwordMatch ? null : userEntity))
        );
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
