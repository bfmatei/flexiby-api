import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '~core/core.module';

import { AuthController } from './auth.controller';

describe('[Core][Auth] Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CoreModule]
    }).compile();

    controller = app.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
