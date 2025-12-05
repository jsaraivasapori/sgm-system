import { PartialType } from '@nestjs/swagger'; // <--- Importante: use este pacote!
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
