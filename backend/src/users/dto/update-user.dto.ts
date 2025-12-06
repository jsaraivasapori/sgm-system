import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // 1. Importe isso

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Vitor',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string válida' })
  @Length(3, 100, { message: 'O nome deve conter entre 3 e 100 caracteres' })
  name?: string;
}
