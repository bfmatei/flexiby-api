import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseType } from 'typeorm';

import { ConfigModule } from '~core/config/config.module';

import { SnakeNamingStrategy } from './snake-naming-strategy';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<DatabaseType>('DB_TYPE') as any,
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        schema: configService.get<string>('DB_SCHEMA'),
        entities: [],
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true,
        autoLoadEntities: true
      })
    })
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
