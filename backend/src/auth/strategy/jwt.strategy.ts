import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // 1. Onde buscar o token? No Header 'Authorization'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // 2. Ignora token expirado? Não, dá erro 401 se expirou
      ignoreExpiration: false,

      // 3. Qual a chave secreta para validar a assinatura?
      // TEM QUE SER A MESMA QUE VOCÊ USOU NO AUTH.MODULE
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  // 4. O que acontece se o token for válido?
  // O retorno desse método é injetado automaticamente em "request.user"
  async validate(payload: any) {
    // payload é o JSON que estava dentro do token (sub, email, etc)
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
