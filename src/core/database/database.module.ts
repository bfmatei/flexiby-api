import { Module } from '@nestjs/common';

import { ConfigModule } from '~core/config/config.module';

import { databaseProvider } from './database.provider';

const providers = [databaseProvider];

@Module({
  imports: [ConfigModule],
  providers,
  exports: providers
})
export class DatabaseModule {}
