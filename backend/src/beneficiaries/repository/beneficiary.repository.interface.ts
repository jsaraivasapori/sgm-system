import { BeneficiaryType } from 'common/enums/beneficiary-type.enum';
import { CreateBeneficiaryDto } from '../dto/create-beneficiary.dto';
import { Beneficiary } from '../entities/beneficiary.entity';
import { UpdateBeneficiaryDto } from '../dto/update-beneficiary.dto';

export interface IBeneficiariesRepository {
  create(createDto: CreateBeneficiaryDto): Promise<Beneficiary>;
  findAll(type?: BeneficiaryType): Promise<Beneficiary[]>;
  findOne(id: string): Promise<Beneficiary | null>;
  // Para validar duplicidade de documento (CPF/CNPJ) antes de criar/atualizar
  findByDocument(document: string): Promise<Beneficiary | null>;
  update(
    beneficiary: Beneficiary,
    updateDto: UpdateBeneficiaryDto,
  ): Promise<Beneficiary>;
  softDelete(id: string): Promise<void>;
}
