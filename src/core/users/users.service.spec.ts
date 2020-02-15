import { Test } from '@nestjs/testing';

import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';

import { UsersService } from './users.service';

describe('[Core][Users] Service', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule, DatabaseModule],
      providers: [UsersService]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
