import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginSuccessDto } from './dto/login-success.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: LoginSuccessDto })
  async login(@Body() body: LoginDto): Promise<LoginSuccessDto> {
    return this.authService.login(body.username, body.password);
  }
}
