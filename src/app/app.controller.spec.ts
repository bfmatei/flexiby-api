import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '~core/core.module';

import { AppController } from './app.controller';

describe('[App] Controller', () => {
  let controller: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      controllers: [AppController]
    }).compile();

    controller = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
