import { Test, TestingModule } from '@nestjs/testing';
import { ProcessesCodevasfController } from './processes-codevasf.controller';
import { ProcessesCodevasfService } from './processes-codevasf.service';

describe('ProcessesCodevasfController', () => {
  let controller: ProcessesCodevasfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessesCodevasfController],
      providers: [ProcessesCodevasfService],
    }).compile();

    controller = module.get<ProcessesCodevasfController>(ProcessesCodevasfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
