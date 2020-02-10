import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenDto {
  @ApiProperty()
  value: string;

  @ApiProperty()
  iat: number;

  @ApiProperty()
  exp: number;
}
