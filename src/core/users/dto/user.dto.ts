import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '~core/users/user.entity';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;

    this.firstName = userEntity.firstName;

    this.lastName = userEntity.lastName;

    this.email = userEntity.email;

    this.username = userEntity.email;
  }
}
