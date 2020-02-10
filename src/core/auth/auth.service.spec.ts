import { Test } from '@nestjs/testing';

import { CoreModule } from '~core/core.module';

import { AuthService } from './auth.service';

describe('[Core][Auth] Service', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CoreModule]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
