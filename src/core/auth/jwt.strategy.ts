import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { JwtPayload } from './auth.model';
import { AuthService } from './auth.service';
import { UnauthorizedExceptionCodes } from '../exceptions/unauthorized-exception';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')
    });
  }

  private isExpired(payload: JwtPayload): boolean {
    return payload.exp - payload.iat <= 0;
  }

  validate(payload: JwtPayload): Observable<UserDto> {
    if (this.isExpired(payload)) {
      return throwError(new UnauthorizedException(UnauthorizedExceptionCodes.TOKEN_EXPIRED));
    }

    return from(this.authService.getUserById(payload.id)).pipe(
      switchMap((user) => {
        if (!user) {
          return throwError(new UnauthorizedException(UnauthorizedExceptionCodes.INVALID_USER));
        }

        return of(user);
      })
    );
  }
}
