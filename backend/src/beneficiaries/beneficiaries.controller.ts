import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Beneficiary } from './entities/beneficiary.entity';
import { BeneficiaryType } from 'common/enums/beneficiary-type.enum';
@ApiTags('Beneficiaries')
@ApiBearerAuth('access-token')
@Controller('beneficiaries')
export class BeneficiariesController {
  constructor(private readonly beneficiariesService: BeneficiariesService) {}
  @Post()
  @ApiOperation({ summary: 'Cadastrar novo beneficiário' })
  @ApiResponse({
    status: 201,
    description: 'Beneficiário criado com sucesso.',
    type: Beneficiary,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflito: Já existe um beneficiário com este CPF/CNPJ.',
  })
  create(@Body() createDto: CreateBeneficiaryDto) {
    return this.beneficiariesService.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os beneficiários (opcional: filtrar por tipo)',
  })
  @ApiQuery({
    name: 'type',
    enum: BeneficiaryType,
    required: false,
    description: 'Filtrar por tipo (Associação, Prefeitura, etc.)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista retornada com sucesso',
    type: [CreateBeneficiaryDto],
  })
  findAll(@Query('type') type?: BeneficiaryType) {
    return this.beneficiariesService.findAll(type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar beneficiário por ID' })
  @ApiResponse({
    status: 200,
    description: 'Beneficiário encontrado',
    type: CreateBeneficiaryDto,
  })
  @ApiResponse({ status: 404, description: 'Beneficiário não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.beneficiariesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados do beneficiário' })
  @ApiResponse({
    status: 409,
    description: 'Conflito: O novo CPF/CNPJ já está em uso por outro registro.',
  })
  update(@Param('id') id: string, @Body() updateDto: UpdateBeneficiaryDto) {
    return this.beneficiariesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover beneficiário (Soft Delete)' })
  remove(@Param('id') id: string) {
    return this.beneficiariesService.remove(id);
  }
}
