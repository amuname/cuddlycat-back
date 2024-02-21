import { Test, TestingModule } from '@nestjs/testing';
import { LkCompanyController as LkController } from './lk-companies.controller';

describe('LkController', () => {
  let controller: LkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LkController],
    }).compile();

    controller = module.get<LkController>(LkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
