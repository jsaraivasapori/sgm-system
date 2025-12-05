import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 1. Valida se o usuário existe e se a senha bate
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    // Se o usuário existe E a senha bate com o hash do banco
    if (user && (await bcrypt.compare(pass, user.password))) {
      // Remove a senha do objeto para não retornar ela sem querer
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  // 2. Gera o Token (Login efetivo)
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload), // Assina e gera o token final
    };
  }
}
