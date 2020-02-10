import { Global, Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { usersRepository } from './users.repository';
import { UsersService } from './users.service';

const providers = [usersRepository, UsersService];

@Global()
@Module({
  controllers: [UsersController],
  providers,
  exports: providers
})
export class UsersModule {}
