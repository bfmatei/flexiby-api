import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
