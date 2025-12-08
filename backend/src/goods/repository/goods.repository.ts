import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Good } from '../entities/good.entity';

import { CreateGoodDto } from '../dto/create-good.dto';
import { UpdateGoodDto } from '../dto/update-good.dto';
import { IGoodsRepository } from './goods.repository.interface';

@Injectable()
export class GoodsRepository implements IGoodsRepository {
  constructor(
    @InjectRepository(Good)
    private readonly typeOrmRepository: Repository<Good>,
  ) {}

  async create(createGoodDto: CreateGoodDto): Promise<Good> {
    const good = this.typeOrmRepository.create(createGoodDto);

    good.isActive = true; //garante que é criado como ativo

    return await this.typeOrmRepository.save(good);
  }

  async findAll(): Promise<Good[]> {
    //retorna todos ativos
    return await this.typeOrmRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  async findById(id: string): Promise<Good | null> {
    //retona apenas o ativo
    return await this.typeOrmRepository.findOneBy({ isActive: true, id });
  }

  async update(id: string, updateGoodDto: UpdateGoodDto): Promise<Good | null> {
    //1. Buscamos primeiro para garantir que ele existe E está ativo pois o preload nao filtra por padrao o campo isActive

    const existingGood = await this.typeOrmRepository.findOne({
      where: { id, isActive: true },
    });

    if (!existingGood) {
      return null; // Não encontrou ou está inativo
    }

    // 2. Mesclamos os dados novos no objeto existente
    const updatedGood = this.typeOrmRepository.merge(
      existingGood,
      updateGoodDto,
    );
    return await this.typeOrmRepository.save(updatedGood);
  }

  async remove(id: string): Promise<void> {
    // <--- SOFT DELETE: Apenas muda o status, não apaga o registro
    await this.typeOrmRepository.update(id, { isActive: false });
  }
}
