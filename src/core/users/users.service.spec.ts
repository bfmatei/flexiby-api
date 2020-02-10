import { Test } from '@nestjs/testing';

import { ConfigModule } from '~core/config/config.module';
import { DatabaseModule } from '~core/database/database.module';

import { usersRepository } from './users.repository';
import { UsersService } from './users.service';

describe('[Core][Users] Service', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule, DatabaseModule],
      providers: [usersRepository, UsersService]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
