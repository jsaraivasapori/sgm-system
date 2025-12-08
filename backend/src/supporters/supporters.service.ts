import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupporterDto } from './dto/create-supporter.dto';
import { UpdateSupporterDto } from './dto/update-supporter.dto';

import { SupporterRole } from 'common/enums/supporter-type.enum';
import { ISupportersRepository } from './repository/supporter.repository.interface';

@Injectable()
export class SupportersService {
  constructor(
    // Injetamos usando um TOKEN (string) que definiremos no módulo para atrelar a classe GoodRepository
    @Inject('ISupportersRepository')
    private readonly repository: ISupportersRepository,
  ) {}

  create(createDto: CreateSupporterDto) {
    return this.repository.create(createDto);
  }

  findAll(role?: SupporterRole) {
    return this.repository.findAll(role);
  }

  async findOne(id: string) {
    const supporter = await this.repository.findOne(id);
    if (!supporter) {
      throw new NotFoundException(`Apoiador não encontrado.`);
    }
    return supporter;
  }

  async update(id: string, updateDto: UpdateSupporterDto) {
    const supporter = await this.findOne(id);
    return this.repository.update(supporter, updateDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repository.softDelete(id);
  }
}
