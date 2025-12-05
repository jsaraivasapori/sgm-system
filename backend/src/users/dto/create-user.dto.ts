import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'O nome completo do usuário',
    example: 'João da Silva',
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  name: string;

  @ApiProperty({
    description: 'O endereço de e-mail único do usuário',
    example: 'joao@email.com',
  })
  @IsEmail({}, { message: 'Por favor, forneça um e-mail válido.' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'A senha de acesso (mínimo 6 caracteres)',
    example: 'senhaForte123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  password: string;
}
