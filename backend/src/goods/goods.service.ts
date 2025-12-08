import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { IGoodsRepository } from './repository/goods.repository.interface';

@Injectable()
export class GoodsService {
  constructor(
    // Injetamos usando um TOKEN (string) que definiremos no módulo para atrelar a classe GoodRepository
    @Inject('IGoodsRepository')
    private readonly goodsRepository: IGoodsRepository,
  ) {}

  async create(createGoodDto: CreateGoodDto) {
    return this.goodsRepository.create(createGoodDto);
  }

  async findAll() {
    return this.goodsRepository.findAll();
  }

  async findOne(id: string) {
    const good = await this.goodsRepository.findById(id);
    if (!good) {
      throw new NotFoundException(`Bem não encontrado.`);
    }
    return good;
  }

  async update(id: string, updateGoodDto: UpdateGoodDto) {
    // O repository verifica se é ativo antes de atualizar
    const updatedGood = await this.goodsRepository.update(id, updateGoodDto);
    if (!updatedGood) {
      throw new NotFoundException(`Bem (Good) não encontrado ou inativo.`);
    }
    return updatedGood;
  }

  async remove(id: string) {
    // Verificamos se existe (e se está ativo) antes de "deletar"
    // Isso garante que retornamos 404 se o usuário tentar deletar algo que já foi soft-deleted
    await this.findOne(id);

    return this.goodsRepository.remove(id);
  }
}
