import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '~app/app.module';

import { ResponseStatus } from './helpers/response-status';

describe('AppController (e2e)', () => {
  let app: INestApplication = null;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('/ (GET)', async () => {
    return request(app.getHttpServer()).get('/').expect(ResponseStatus.OK).expect('Hello World!');
  });
});
