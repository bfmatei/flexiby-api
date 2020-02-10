import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '~core/auth/auth.module';
import { ConfigModule } from '~core/config/config.module';
import { DatabaseModule } from '~core/database/database.module';

import { UsersController } from './users.controller';
import { usersRepository } from './users.repository';
import { UsersService } from './users.service';

const providers = [usersRepository, UsersService];

@Module({
  imports: [ConfigModule, DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers,
  exports: [...providers]
})
export class UsersModule {}
