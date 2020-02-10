import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserInsertDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(300)
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  password: string;
}
