import { Test, TestingModule } from '@nestjs/testing';
import { LkUserController as LkController } from './lk-user.controller';

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
