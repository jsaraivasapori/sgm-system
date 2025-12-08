import { CreateGoodDto } from '../dto/create-good.dto';
import { UpdateGoodDto } from '../dto/update-good.dto';
import { Good } from '../entities/good.entity';

export interface IGoodsRepository {
  create(createGoodDto: CreateGoodDto): Promise<Good>;
  findAll(): Promise<Good[]>;
  findById(id: string): Promise<Good | null>;
  update(id: string, updateGoodDto: UpdateGoodDto): Promise<Good | null>; // Retorna null se não achar
  remove(id: string): Promise<void>;
}
