import { Supporter } from '../entities/supporter.entity';
import { CreateSupporterDto } from '../dto/create-supporter.dto';
import { UpdateSupporterDto } from '../dto/update-supporter.dto';
import { GetSupportersFilterDto } from '../dto/create-supporter-filter.dto';

export interface ISupportersRepository {
  create(createDto: CreateSupporterDto): Promise<Supporter>;
  findAll(filters: GetSupportersFilterDto): Promise<Supporter[]>;
  findOne(id: string): Promise<Supporter | null>;
  update(
    supporter: Supporter,
    updateDto: UpdateSupporterDto,
  ): Promise<Supporter>;
  softDelete(id: string): Promise<void>;
}
