import { Global, Module } from '@nestjs/common';

import { databaseProvider } from './database.provider';

const providers = [databaseProvider];

@Global()
@Module({
  providers,
  exports: providers
})
export class DatabaseModule {}
