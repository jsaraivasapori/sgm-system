import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { IBeneficiariesRepository } from './repository/beneficiary.repository.interface';
import { BeneficiaryType } from 'common/enums/beneficiary-type.enum';

@Injectable()
export class BeneficiariesService {
  constructor(
    @Inject('IBeneficiariesRepository')
    private readonly repository: IBeneficiariesRepository,
  ) {}

  async create(createDto: CreateBeneficiaryDto) {
    // 1. Validação de Unicidade (Business Rule)
    const existingBeneficiary = await this.repository.findByDocument(
      createDto.document,
    );

    if (existingBeneficiary) {
      throw new ConflictException(
        `Já existe um beneficiário cadastrado com o documento ${createDto.document}.`,
      );
    }

    return this.repository.create(createDto);
  }

  findAll(type?: BeneficiaryType) {
    return this.repository.findAll(type);
  }

  async findOne(id: string) {
    const beneficiary = await this.repository.findOne(id);
    if (!beneficiary) {
      throw new NotFoundException(`Beneficiário não encontrado.`);
    }
    return beneficiary;
  }

  async update(id: string, updateDto: UpdateBeneficiaryDto) {
    // 1. Garante que o registro existe
    const beneficiary = await this.findOne(id);

    // 2. Se estiver tentando alterar o CPF/CNPJ, verifica se já não pertence a OUTRO
    if (updateDto.document && updateDto.document !== beneficiary.document) {
      const duplicateParams = await this.repository.findByDocument(
        updateDto.document,
      );

      // Se achou alguém E não é o próprio usuário que estamos editando
      if (duplicateParams && duplicateParams.id !== id) {
        throw new ConflictException(
          `O documento ${updateDto.document} já está em uso por outro beneficiário.`,
        );
      }
    }

    return this.repository.update(beneficiary, updateDto);
  }

  async remove(id: string) {
    await this.findOne(id); // Garante que existe antes de deletar
    return this.repository.softDelete(id);
  }
}
