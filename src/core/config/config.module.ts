import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [NestConfigModule.forRoot()],
  exports: [NestConfigModule]
})
export class ConfigModule {}
