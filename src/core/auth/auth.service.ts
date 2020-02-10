import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserDto } from '~core/users/dto/user.dto';
import { UsersService } from '~core/users/users.service';

import { JwtPayload } from './auth.model';
import { LoginSuccessDto } from './dto/login-success.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.usersService.findOneById(id);

    return this.usersService.entityToDto(user);
  }

  async login(username: string, password: string): Promise<LoginSuccessDto> {
    const user = await this.usersService.findOneByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = { id: user.id, username: user.username };

    return {
      token: this.jwtService.sign(payload),
      user: this.usersService.entityToDto(user)
    };
  }
}
