import { PartialType } from '@nestjs/swagger';
import { CreateProcessesCodevasfDto } from './create-processes-codevasf.dto';

export class UpdateProcessesCodevasfDto extends PartialType(CreateProcessesCodevasfDto) {}
