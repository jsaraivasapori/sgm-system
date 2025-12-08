import { Injectable } from '@nestjs/common';
import { IBeneficiariesRepository } from './beneficiary.repository.interface';
import { CreateBeneficiaryDto } from '../dto/create-beneficiary.dto';
import { Beneficiary } from '../entities/beneficiary.entity';
import { BeneficiaryType } from 'common/enums/beneficiary-type.enum';
import { UpdateBeneficiaryDto } from '../dto/update-beneficiary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BeneficiariesRepository implements IBeneficiariesRepository {
  constructor(
    @InjectRepository(Beneficiary)
    private readonly typeOrmRepo: Repository<Beneficiary>,
  ) {}

  async create(createDto: CreateBeneficiaryDto): Promise<Beneficiary> {
    const beneficiary = this.typeOrmRepo.create(createDto);
    return this.typeOrmRepo.save(beneficiary);
  }

  async findAll(type?: BeneficiaryType): Promise<Beneficiary[]> {
    return this.typeOrmRepo.find({
      where: {
        ...(type ? { type } : {}), // Aplica o filtro se o tipo for informado
      },
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<Beneficiary | null> {
    return this.typeOrmRepo.findOne({ where: { id } });
  }

  async findByDocument(document: string): Promise<Beneficiary | null> {
    return this.typeOrmRepo.findOne({
      where: { document },
      withDeleted: true, // Busca até nos deletados para evitar reuso de CNPJ como regra de negócio
    });
  }

  async update(
    beneficiary: Beneficiary,
    updateDto: UpdateBeneficiaryDto,
  ): Promise<Beneficiary> {
    this.typeOrmRepo.merge(beneficiary, updateDto);
    return this.typeOrmRepo.save(beneficiary);
  }

  async softDelete(id: string): Promise<void> {
    await this.typeOrmRepo.softDelete(id);
  }
}
