import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { BeneficiaryType } from 'common/enums/beneficiary-type.enum';

export class CreateBeneficiaryDto {
  @ApiProperty({ example: 'Associação dos Produtores Rurais' })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @ApiProperty({
    example: '12345678000199',
    description:
      'CPF (11 dígitos) ou CNPJ (14 dígitos). Apenas números ou com formatação (será limpo automaticamente).',
  })
  @Transform(({ value }) => value?.replace(/\D/g, '')) // Remove tudo que não é dígito antes de validar
  @IsString()
  @IsNotEmpty({ message: 'O documento (CPF/CNPJ) é obrigatório' })
  @Length(11, 14, {
    message:
      'O documento deve ter entre 11 (CPF) e 14 (CNPJ) caracteres numéricos',
  })
  document: string;

  @ApiProperty({
    enum: BeneficiaryType,
    example: BeneficiaryType.ASSOCIACAO,
    description: 'Tipo de beneficiário (Associação, Prefeitura, etc.)',
  })
  @IsEnum(BeneficiaryType, {
    message: 'Tipo de beneficiário inválido',
  })
  @IsNotEmpty()
  type: BeneficiaryType;

  @ApiProperty({ example: 'Montes Claros' })
  @IsString()
  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  city: string;

  @ApiProperty({
    example: 'Comunidade Vargem Grande S/N , Ibiaí, Minas Gerais',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;
}
