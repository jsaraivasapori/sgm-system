import { Supporter } from '../entities/supporter.entity';
import { CreateSupporterDto } from '../dto/create-supporter.dto';
import { UpdateSupporterDto } from '../dto/update-supporter.dto';
import { SupporterRole } from 'common/enums/supporter-type.enum';

export interface ISupportersRepository {
  create(createDto: CreateSupporterDto): Promise<Supporter>;
  findAll(role?: SupporterRole): Promise<Supporter[]>;
  findOne(id: string): Promise<Supporter | null>;
  update(
    supporter: Supporter,
    updateDto: UpdateSupporterDto,
  ): Promise<Supporter>;
  softDelete(id: string): Promise<void>;
}
