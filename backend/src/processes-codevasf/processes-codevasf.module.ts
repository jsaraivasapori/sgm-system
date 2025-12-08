import { Module } from '@nestjs/common';
import { ProcessesCodevasfService } from './processes-codevasf.service';
import { ProcessesCodevasfController } from './processes-codevasf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessCodevasf } from './entities/process-codevasf.entity';
import { ProcessCodevasfHistory } from './entities/process-codevasf-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProcessCodevasf, ProcessCodevasfHistory]),
  ],
  controllers: [ProcessesCodevasfController],
  providers: [ProcessesCodevasfService],
})
export class ProcessesCodevasfModule {}
