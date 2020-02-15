import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { UnauthorizedExceptionCodes } from '../exceptions/unauthorized-exception';

import { JwtPayload } from './auth.model';
import { LoginSuccessDto } from './dto/login-success.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  getUserById(id: string): Observable<UserDto> {
    return from(this.usersService.findOneById(id)).pipe(
      map((userEntity) => this.usersService.entityToDto(userEntity))
    );
  }

  login(username: string, password: string): Observable<LoginSuccessDto> {
    return this.usersService.findOneByUsernameAndPassword(username, password).pipe(
      switchMap((userEntity) => {
        if (!userEntity) {
          return throwError(
            new UnauthorizedException(UnauthorizedExceptionCodes.INVALID_USER_PASSWORD)
          );
        }

        const payload: Partial<JwtPayload> = { id: userEntity.id };

        const encodedToken = this.jwtService.sign(payload);

        const decodedToken = this.jwtService.decode(encodedToken) as JwtPayload;

        return of({
          token: {
            value: encodedToken,
            iat: decodedToken.iat,
            exp: decodedToken.exp
          },
          user: this.usersService.entityToDto(userEntity)
        });
      })
    );
  }
}
