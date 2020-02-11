import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { LoginSuccessDto } from './dto/login-success.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: LoginSuccessDto })
  login(@Body() body: LoginDto): Observable<LoginSuccessDto> {
    return this.authService.login(body.username, body.password);
  }
}
