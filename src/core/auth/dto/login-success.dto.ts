import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from '~core/users/dto/user.dto';

export class LoginSuccessDto {
  @ApiProperty()
  token: string;

  @ApiProperty({ type: UserDto })
  user: UserDto;
}
