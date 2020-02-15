import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from '../../users/dto/user.dto';

import { JwtTokenDto } from './jwt-token.dto';

export class LoginSuccessDto {
  @ApiProperty({ type: JwtTokenDto })
  token: JwtTokenDto;

  @ApiProperty({ type: UserDto })
  user: UserDto;
}
