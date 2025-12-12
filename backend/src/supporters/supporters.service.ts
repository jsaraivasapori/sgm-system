import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupporterDto } from './dto/create-supporter.dto';
import { UpdateSupporterDto } from './dto/update-supporter.dto';

import { SupporterRole } from 'common/enums/supporter-type.enum';
import { ISupportersRepository } from './repository/supporter.repository.interface';
import { GetSupportersFilterDto } from './dto/create-supporter-filter.dto';

@Injectable()
export class SupportersService {
  constructor(
    @Inject('ISupportersRepository')
    private readonly repository: ISupportersRepository,
  ) {}

  create(createDto: CreateSupporterDto) {
    return this.repository.create(createDto);
  }

  findAll(filterDto: GetSupportersFilterDto) {
    return this.repository.findAll(filterDto);
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
