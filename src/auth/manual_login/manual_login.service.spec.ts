import { Test, TestingModule } from '@nestjs/testing';
import { ManualLoginService } from './manual_login.service';

describe('ManualLoginService', () => {
  let service: ManualLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManualLoginService],
    }).compile();

    service = module.get<ManualLoginService>(ManualLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
