import { Test, TestingModule } from '@nestjs/testing';
import { LkUserService as LkService } from './lk-user.service';

describe('LkService', () => {
  let service: LkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LkService],
    }).compile();

    service = module.get<LkService>(LkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
