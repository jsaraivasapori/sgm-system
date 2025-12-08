import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supporter } from '../entities/supporter.entity';
import { CreateSupporterDto } from '../dto/create-supporter.dto';
import { SupporterRole } from 'common/enums/supporter-type.enum';
import { UpdateSupporterDto } from '../dto/update-supporter.dto';
import { ISupportersRepository } from './supporter.repository.interface';

@Injectable()
export class SupportersRepository implements ISupportersRepository {
  constructor(
    @InjectRepository(Supporter)
    private readonly typeOrmRepo: Repository<Supporter>,
  ) {}

  async create(createDto: CreateSupporterDto): Promise<Supporter> {
    const supporter = this.typeOrmRepo.create(createDto);
    return this.typeOrmRepo.save(supporter);
  }

  async findAll(role?: SupporterRole): Promise<Supporter[]> {
    return this.typeOrmRepo.find({
      where: {
        ...(role ? { role } : {}), // Lógica de filtro fica aqui
      },
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<Supporter | null> {
    return this.typeOrmRepo.findOne({ where: { id } });
  }

  async update(
    supporter: Supporter,
    updateDto: UpdateSupporterDto,
  ): Promise<Supporter> {
    this.typeOrmRepo.merge(supporter, updateDto);
    return this.typeOrmRepo.save(supporter);
  }

  async softDelete(id: string): Promise<void> {
    await this.typeOrmRepo.softDelete(id);
  }
}
