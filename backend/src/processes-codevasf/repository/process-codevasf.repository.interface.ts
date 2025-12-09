import { ProcessCodevasf } from '../entities/process-codevasf.entity';
import { CreateProcessesCodevasfDto } from '../dto/create-processes-codevasf.dto';
import { UpdateProcessesCodevasfDto } from '../dto/update-processes-codevasf.dto';
export interface IProcessesCodevasfRepository {
  create(
    createDto: CreateProcessesCodevasfDto,
    userId: string,
  ): Promise<ProcessCodevasf>;
  findAll(): Promise<ProcessCodevasf[]>;
  findOne(id: string): Promise<ProcessCodevasf | null>;
  update(
    process: ProcessCodevasf,
    updateDto: UpdateProcessesCodevasfDto,
    userId: string,
  ): Promise<ProcessCodevasf>;
  softDelete(id: string): Promise<void>;
}
