import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';

describe('[Core][Auth] Controller', () => {
  let controller: AuthController = null;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule]
    }).compile();

    controller = app.get(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
