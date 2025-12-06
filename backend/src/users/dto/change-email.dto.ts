import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeEmailDto {
  @ApiProperty({
    description: 'O novo endereço de e-mail que o usuário deseja utilizar',
    example: 'novoemail@exemplo.com',
  })
  @IsEmail({}, { message: 'Por favor, forneça um e-mail válido.' })
  @IsNotEmpty({ message: 'O novo e-mail não pode ser vazio.' })
  newEmail: string;
}
