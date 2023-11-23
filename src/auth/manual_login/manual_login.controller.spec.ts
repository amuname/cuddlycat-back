import { Test, TestingModule } from '@nestjs/testing';
import { ManualLoginController } from './manual_login.controller';

describe('ManualLoginController', () => {
  let controller: ManualLoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManualLoginController],
    }).compile();

    controller = module.get<ManualLoginController>(ManualLoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
