import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ProcessCodevasfStatus } from 'common/enums/process-codevasf-status.enum';

export class CreateProcessesCodevasfDto {
  @ApiProperty({
    example: 'Entrega de Trator - Emenda Dep. Fulano',
    description:
      'Título curto para identificação fácil. Se vazio, será gerado automaticamente.',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Doação de Trator para Associação X' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 150000.0, description: 'Valor do bem ou recurso' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  value: number;

  // --- AMARRAÇÃO COM OS MÓDULOS QUE CRIAMOS ---

  @ApiProperty({
    description: 'ID do Bem (Good) a ser doado',
    example: 'uuid-do-bem',
  })
  @IsUUID(4, { message: 'ID do bem inválido' })
  @IsNotEmpty()
  goodId: string;

  @ApiProperty({
    description: 'ID do Beneficiário (Quem recebe)',
    example: 'uuid-do-beneficiario',
  })
  @IsUUID(4, { message: 'ID do beneficiário inválido' })
  @IsNotEmpty()
  beneficiaryId: string;

  @ApiProperty({
    description: 'ID do Apoiador (Quem indicou)',
    example: 'uuid-do-apoiador',
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'ID do apoiador inválido' })
  supporterId?: string;

  // Status inicial opcional (geralmente começa como TRIAGEM, mas pode-se forçar outro)
  @ApiProperty({ enum: ProcessCodevasfStatus, required: false })
  @IsOptional()
  @IsEnum(ProcessCodevasfStatus)
  status?: ProcessCodevasfStatus;
}
