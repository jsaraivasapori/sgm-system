import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK) // Login deve retornar 200, não 201 (Created)
  @Post('login')
  @ApiOperation({ summary: 'Realizar login (Obter Token JWT)' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso.',
    type: AuthResponseDto, // <--- Mostra o formato do JSON de resposta no Swagger
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas (Email ou senha incorretos).',
  })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return this.authService.login(user);
  }
}
