import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { createConnection } from 'typeorm';

import { SnakeNamingStrategy } from './snake-naming-strategy';

export const databaseProvider: Provider = {
  provide: 'DATABASE_CONNECTION',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    await createConnection({
      type: configService.get<'postgres' | 'mysql'>('DB_TYPE'),
      host: configService.get<string>('DB_HOST'),
      port: Number(configService.get<string>('DB_PORT')),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      schema: configService.get<string>('DB_SCHEMA'),
      entities: [path.join(__dirname, '../../**/*.entity.{js,ts}')],
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true
    })
};
