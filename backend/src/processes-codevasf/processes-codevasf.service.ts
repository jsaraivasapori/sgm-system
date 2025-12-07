import { Injectable } from '@nestjs/common';
import { CreateProcessesCodevasfDto } from './dto/create-processes-codevasf.dto';
import { UpdateProcessesCodevasfDto } from './dto/update-processes-codevasf.dto';

@Injectable()
export class ProcessesCodevasfService {
  create(createProcessesCodevasfDto: CreateProcessesCodevasfDto) {
    return 'This action adds a new processesCodevasf';
  }

  findAll() {
    return `This action returns all processesCodevasf`;
  }

  findOne(id: number) {
    return `This action returns a #${id} processesCodevasf`;
  }

  update(id: number, updateProcessesCodevasfDto: UpdateProcessesCodevasfDto) {
    return `This action updates a #${id} processesCodevasf`;
  }

  remove(id: number) {
    return `This action removes a #${id} processesCodevasf`;
  }
}
