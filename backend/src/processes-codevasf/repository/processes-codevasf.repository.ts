import { InjectRepository } from '@nestjs/typeorm';
import { CreateProcessesCodevasfDto } from '../dto/create-processes-codevasf.dto';
import { UpdateProcessesCodevasfDto } from '../dto/update-processes-codevasf.dto';
import { ProcessCodevasf } from '../entities/process-codevasf.entity';
import { IProcessesCodevasfRepository } from './process-codevasf.repository.interface';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcessesCodevasReposiory implements IProcessesCodevasfRepository {
  constructor(
    @InjectRepository(ProcessCodevasf)
    private readonly typeOrmRepository: Repository<ProcessCodevasf>,
  ) {}
  async create(
    createDto: CreateProcessesCodevasfDto,
    userId: string,
  ): Promise<ProcessCodevasf> {
    const nupTimestamp = this.generateNup();

    const newProcess = this.typeOrmRepository.create({
      ...createDto,
      nup: nupTimestamp,
      title: createDto.title,
      good: { id: createDto.goodId },
      beneficiary: { id: createDto.beneficiaryId },
      supporter: { id: createDto.supporterId },

      createdBy: { id: userId },
      updatedBy: { id: userId },
    });
    return this.typeOrmRepository.save(newProcess);
  }

  async findAll(): Promise<ProcessCodevasf[]> {
    return this.typeOrmRepository.find({
      relations: ['good', 'beneficiary', 'supporter'], // Traz os dados completos
      select: {
        id: true,
        nup: true,
        value: true,
        status: true,
        createdAt: true,
        good: {
          id: true,
          name: true,
          description: true,
        },
        beneficiary: {
          id: true,
          name: true,
          city: true,
        },
        supporter: {
          id: true,
          name: true,
        },
      },
      order: { createdAt: 'DESC' },
    });
  }
  async findOne(id: string): Promise<ProcessCodevasf | null> {
    return this.typeOrmRepository.findOne({
      where: { id },
      relations: [
        'good',
        'beneficiary',
        'supporter',
        'history',
        'createdBy',
        'updatedBy',
      ],
    });
  }
  async update(
    process: ProcessCodevasf,
    updateDto: UpdateProcessesCodevasfDto,
    userId: string,
  ): Promise<ProcessCodevasf> {
    //mescla os dados simples

    this.typeOrmRepository.merge(process, updateDto);

    // Atualiza relacionamentos se vierem no DTO e se houve mudnaças
    if (updateDto.goodId) process.good = { id: updateDto.goodId } as any;
    if (updateDto.beneficiaryId)
      process.beneficiary = { id: updateDto.beneficiaryId } as any;
    if (updateDto.supporterId)
      process.supporter = { id: updateDto.supporterId } as any;

    // Atualiza quem mexeu por último
    process.updatedBy = { id: userId } as any;

    return this.typeOrmRepository.save(process);
  }
  async softDelete(id: string): Promise<void> {
    await this.typeOrmRepository.softDelete(id);
  }

  //========================================
  // MÉTODOS AUXILIARES
  //========================================

  private generateNup(): string {
    const now = new Date();
    const year = now.getFullYear();
    const timestamp = now.getTime();
    return `${year}${timestamp}`;
  }
}
