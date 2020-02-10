import { Global, Module } from '@nestjs/common';
import { PassportModule as NestPassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports: [NestPassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [NestPassportModule.register({ defaultStrategy: 'jwt' })]
})
export class PassportModule {}
