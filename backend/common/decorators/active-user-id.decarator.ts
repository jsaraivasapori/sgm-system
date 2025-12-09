import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ActiveUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    // Ajuste aqui conforme seu payload JWT.
    // Geralmente o ID fica em 'user.sub' ou 'user.id'
    const user = request.user;

    // Se estiver usando o AuthGuard padrão do Passport:
    return user?.sub || user?.id;
  },
);
