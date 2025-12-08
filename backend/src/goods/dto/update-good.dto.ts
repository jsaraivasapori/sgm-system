import { PartialType } from '@nestjs/swagger';
import { CreateGoodDto } from './create-good.dto';

export class UpdateGoodDto extends PartialType(CreateGoodDto) {
  // Se no futuro  quiser permitir reativar um bem manualmente via update,
  // eu poderia descomentar a linha abaixo.
  // Por enquanto, deixei oculto para manter o padrão do Soft Delete via rota delete.
  // @IsOptional()
  // @IsBoolean()
  // isActive?: boolean;
}
