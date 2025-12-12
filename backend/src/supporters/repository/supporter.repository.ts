import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supporter } from '../entities/supporter.entity';
import { CreateSupporterDto } from '../dto/create-supporter.dto';
import { SupporterRole } from 'common/enums/supporter-type.enum';
import { UpdateSupporterDto } from '../dto/update-supporter.dto';
import { ISupportersRepository } from './supporter.repository.interface';
import { GetSupportersFilterDto } from '../dto/create-supporter-filter.dto';

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

  async findAll(filters: GetSupportersFilterDto): Promise<Supporter[]> {
    const { role, startDate, endDate } = filters;
    const query = this.typeOrmRepo.createQueryBuilder('supporter');

    if (role) {
      query.andWhere('supporter.role = :role', { role });
    }

    if (startDate) {
      query.andWhere('supporter.createdAt >= :startDate', { startDate });
    }

    if (endDate) {
      // Ajuste para pegar o final do dia
      query.andWhere('supporter.createdAt <= :endDate', {
        endDate: `${endDate} 23:59:59`,
      });
    }

    // Ordenação opcional (muito útil em listagens)
    query.orderBy('supporter.createdAt', 'DESC');

    return query.getMany();
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
