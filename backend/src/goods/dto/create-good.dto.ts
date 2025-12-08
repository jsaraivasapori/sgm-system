import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateGoodDto {
  @ApiProperty({
    example: 'Trator Agrícola 75cv',
    description: 'Nome do bem ou mercadoria.',
  })
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome do bem é obrigatório.' })
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    example: 'Trator azul traçado para aragem de terra.',
    description: 'Descrição detalhada do item.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 150000.0,
    description: 'Valor estimado do bem em reais.',
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  estimatedValue?: number;
}
