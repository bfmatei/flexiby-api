import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';

export function createRepository(name: string, entity: any): Provider {
  return {
    provide: `${name.toUpperCase()}_REPOSITORY`,
    inject: ['DATABASE_CONNECTION'],
    useFactory: (connection: Connection) => connection.getRepository(entity)
  };
}
