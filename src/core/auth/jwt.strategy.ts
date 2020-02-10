import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '~core/auth/auth.model';
import { AuthService } from '~core/auth/auth.service';
import { UserDto } from '~core/users/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')
    });
  }

  private isExpired(payload: JwtPayload): boolean {
    return payload.exp - payload.iat <= 0;
  }

  async validate(payload: JwtPayload): Promise<UserDto> {
    if (this.isExpired(payload)) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.getUserById(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
