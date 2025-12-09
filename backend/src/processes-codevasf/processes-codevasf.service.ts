import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProcessesCodevasfDto } from './dto/create-processes-codevasf.dto';
import { UpdateProcessesCodevasfDto } from './dto/update-processes-codevasf.dto';
import { IProcessesCodevasfRepository } from './repository/process-codevasf.repository.interface';
import { GoodsService } from 'src/goods/goods.service';
import { BeneficiariesService } from 'src/beneficiaries/beneficiaries.service';
import { SupportersService } from 'src/supporters/supporters.service';

@Injectable()
export class ProcessesCodevasfService {
  constructor(
    @Inject('IProcessesCodevasfRepository')
    private readonly repository: IProcessesCodevasfRepository,
    private readonly goodsService: GoodsService,
    private readonly beneficiariesService: BeneficiariesService,
    private readonly supportersService: SupportersService,
  ) {}
  async create(
    createProcessesCodevasfDto: CreateProcessesCodevasfDto,
    userId: string,
  ) {
    // 1. Valida se as referências existem (lança 404 se não achar)
    await this.goodsService.findOne(createProcessesCodevasfDto.goodId);
    await this.beneficiariesService.findOne(
      createProcessesCodevasfDto.beneficiaryId,
    );

    // verifica se foi atrelado algum supporter ao processo
    if (createProcessesCodevasfDto.supporterId) {
      await this.supportersService.findOne(
        createProcessesCodevasfDto.supporterId,
      );
    }
    // 2. Cria o processo com a auditoria do usuário
    return this.repository.create(createProcessesCodevasfDto, userId);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const process = await this.repository.findOne(id);
    if (!process) throw new NotFoundException(`Processo  não encontrado`);
    return process;
  }

  async update(
    id: string,
    userId: string,
    updateProcessesCodevasfDto: UpdateProcessesCodevasfDto,
  ) {
    const process = await this.findOne(id);
    // Valida FKs (good,beneficiary e supporter)se estiverem sendo alteradas

    if (updateProcessesCodevasfDto.goodId)
      await this.goodsService.findOne(updateProcessesCodevasfDto.goodId);
    if (updateProcessesCodevasfDto.beneficiaryId)
      await this.beneficiariesService.findOne(
        updateProcessesCodevasfDto.beneficiaryId,
      );
    if (updateProcessesCodevasfDto.supporterId)
      await this.supportersService.findOne(
        updateProcessesCodevasfDto.supporterId,
      );

    return this.repository.update(process, updateProcessesCodevasfDto, userId);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repository.softDelete(id);
  }
}
