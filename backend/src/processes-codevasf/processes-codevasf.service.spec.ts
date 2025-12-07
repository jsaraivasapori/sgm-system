import { Test, TestingModule } from '@nestjs/testing';
import { ProcessesCodevasfService } from './processes-codevasf.service';

describe('ProcessesCodevasfService', () => {
  let service: ProcessesCodevasfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessesCodevasfService],
    }).compile();

    service = module.get<ProcessesCodevasfService>(ProcessesCodevasfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
