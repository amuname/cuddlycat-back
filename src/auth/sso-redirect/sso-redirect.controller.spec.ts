import { Test, TestingModule } from '@nestjs/testing';
import { SsoRedirectController } from './sso-redirect.controller';

describe('SsoRedirectController', () => {
  let controller: SsoRedirectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SsoRedirectController],
    }).compile();

    controller = module.get<SsoRedirectController>(SsoRedirectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
