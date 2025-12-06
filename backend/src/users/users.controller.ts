import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeEmailDto } from './dto/change-email.dto';

@ApiTags('users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // --- CREATE USER ---
  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
    type: UserResponseDto, // Mostra o schema de retorno no Swagger
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return user as unknown as UserResponseDto;
  }

  // --- READ ALL ---
  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso.',
    type: [UserResponseDto],
  })
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll();
    return users as unknown as UserResponseDto[];
  }

  // --- READ ONE ---
  @Get(':id')
  @ApiOperation({ summary: 'Buscar um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário (MongoDB ObjectID)' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
    type: UserResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.usersService.findOne(id);
    return user as unknown as UserResponseDto;
  }

  // ==================================================================
  // OS 3 MÉTODOS DE UPDATE
  // ==================================================================

  // 1. UPDATE GENÉRICO (Dados sem Email/Senha)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar perfil (exceto dados sensíveis)' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiBody({ type: UpdateUserDto }) // Documenta o body correto no Swagger
  @ApiResponse({
    status: 200,
    description: 'Perfil atualizado com sucesso.',
    type: UserResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    // Aqui o seu service vai rodar aquele 'delete email/password'
    const user = await this.usersService.update(id, updateUserDto);
    return user as unknown as UserResponseDto;
  }

  // 2. UPDATE PASSWORD (Rota específica)

  @Patch(':id/password')
  @ApiOperation({ summary: 'Alterar senha do usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiBody({ type: ChangePasswordDto }) // Documenta o body correto no Swagger
  @ApiResponse({ status: 204, description: 'Senha alterada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Senha inválida ou fraca.' })
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content é padrão para updates sem retorno
  async updatePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    return this.usersService.updatePassword(id, changePasswordDto.newPassword);
  }

  // 3. UPDATE EMAIL (Rota específica - opcional, mas recomendada já que removemos do genérico)
  @Patch(':id/email')
  @ApiOperation({ summary: 'Alterar e-mail do usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiBody({ type: ChangeEmailDto })
  @ApiResponse({ status: 200, description: 'E-mail atualizado com sucesso.' })
  async updateEmail(
    @Param('id') id: string,
    @Body() changeEmailDto: ChangeEmailDto,
  ): Promise<UserResponseDto> {
    // Supondo que você crie um updateEmail no service
    const user = await this.usersService.updateEmail(
      id,
      changeEmailDto.newEmail,
    );
    return user as unknown as UserResponseDto;
  }

  // ==================================================================

  // --- DELETE ---
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário a ser removido' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}
