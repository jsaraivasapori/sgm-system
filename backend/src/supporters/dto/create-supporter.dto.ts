import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SupporterRole } from 'common/enums/supporter-type.enum';

export class CreateSupporterDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @ApiProperty({
    enum: SupporterRole,

    example: SupporterRole.VEREADOR,
    description: 'Cargo político ou social',
  })
  @IsEnum(SupporterRole, {
    message: 'O cargo deve ser válido (VEREADOR, PREFEITO, etc.)',
  })
  @IsNotEmpty()
  role: SupporterRole;

  @ApiProperty({ example: 'Montes Claros' })
  @IsString()
  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  city: string;

  @ApiProperty({ example: '38999887766', required: false })
  @IsOptional()
  @IsString()
  // @IsPhoneNumber('BR') // Opcional: Descomente se quiser validação estrita de telefone
  phone?: string;
}
