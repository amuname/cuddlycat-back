import { Test, TestingModule } from '@nestjs/testing';
import { LkProductController as LkController } from './admin-product.controller';

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
