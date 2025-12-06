import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-1234-abcd', description: 'ID do usuário' })
  id: string;

  @ApiProperty({ example: 'joao@email.com' })
  email: string;

  @ApiProperty({ example: 'João da Silva' })
  name: string;

  @ApiProperty({ description: 'Data de criação do registro' })
  createdAt: Date;
}
