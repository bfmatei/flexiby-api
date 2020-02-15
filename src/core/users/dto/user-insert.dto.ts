import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserInsertDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @MinLength(5)
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
