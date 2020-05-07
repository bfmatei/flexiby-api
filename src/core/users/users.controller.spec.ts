import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '../core.module';

import { UsersController } from './users.controller';

describe('[Core][Users] Controller', () => {
  let controller: UsersController = null;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CoreModule]
    }).compile();

    controller = app.get(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
