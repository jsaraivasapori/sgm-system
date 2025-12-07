import { Module } from '@nestjs/common';
import { ProcessesCodevasfService } from './processes-codevasf.service';
import { ProcessesCodevasfController } from './processes-codevasf.controller';

@Module({
  controllers: [ProcessesCodevasfController],
  providers: [ProcessesCodevasfService],
})
export class ProcessesCodevasfModule {}
