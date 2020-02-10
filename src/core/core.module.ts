import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from './jwt/jwt.module';
import { PassportModule } from './passport/passport.module';
import { UsersModule } from './users/users.module';

const modules = [
  ConfigModule,
  DatabaseModule,
  JwtModule,
  PassportModule,
  UsersModule,
  AuthModule
];

@Module({
  imports: modules,
  exports: modules
})
export class CoreModule {}
