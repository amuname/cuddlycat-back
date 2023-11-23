import { Test, TestingModule } from '@nestjs/testing';
import { SsoRedirectService } from './sso-redirect.service';

describe('SsoRedirectService', () => {
  let service: SsoRedirectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SsoRedirectService],
    }).compile();

    service = module.get<SsoRedirectService>(SsoRedirectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
