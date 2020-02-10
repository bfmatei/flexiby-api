import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

const modules = [ConfigModule, DatabaseModule, UsersModule, AuthModule];

@Module({
  imports: modules,
  exports: modules
})
export class CoreModule {}
