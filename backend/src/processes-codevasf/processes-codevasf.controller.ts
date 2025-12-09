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
import { ProcessesCodevasfService } from './processes-codevasf.service';
import { CreateProcessesCodevasfDto } from './dto/create-processes-codevasf.dto';
import { UpdateProcessesCodevasfDto } from './dto/update-processes-codevasf.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProcessCodevasf } from './entities/process-codevasf.entity';
import { ActiveUserId } from 'common/decorators/active-user-id.decarator';

@ApiTags('Processes Codevasf (Processos de Doação)')
@ApiBearerAuth() // Indica no Swagger que precisa de token
@Controller('processes-codevasf')
export class ProcessesCodevasfController {
  constructor(
    private readonly processesCodevasfService: ProcessesCodevasfService,
  ) {}

  @ApiOperation({ summary: 'Criar novo processo de doação' })
  @ApiResponse({
    status: 201,
    description: 'Processo criado com sucesso.',
    type: ProcessCodevasf,
  })
  @ApiResponse({
    status: 404,
    description: 'Bem, Beneficiário ou Apoiador não encontrado.',
  })
  @Post()
  create(
    @Body() createProcessesCodevasfDto: CreateProcessesCodevasfDto,
    @ActiveUserId() userId: string,
  ) {
    return this.processesCodevasfService.create(
      createProcessesCodevasfDto,
      userId,
    );
  }

  @ApiOperation({ summary: 'Listar todos os processos' })
  @ApiResponse({ status: 200, type: [ProcessCodevasf] })
  @Get()
  findAll() {
    return this.processesCodevasfService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar processo por ID' })
  @ApiResponse({ status: 200, type: ProcessCodevasf })
  @ApiResponse({ status: 404, description: 'Processo não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.processesCodevasfService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar processo' })
  @ApiResponse({ status: 200, type: ProcessCodevasf })
  update(
    @Param('id') id: string,
    @Body() updateProcessesCodevasfDto: UpdateProcessesCodevasfDto,
    @ActiveUserId() userId: string,
  ) {
    return this.processesCodevasfService.update(
      id,
      userId,
      updateProcessesCodevasfDto,
    );
  }

  @ApiOperation({ summary: 'Remover processo (Soft Delete)' })
  @ApiResponse({ status: 200, description: 'Processo removido com sucesso.' })
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 (Sucesso, sem conteúdo) ao deletar
  @ApiResponse({ status: 404, description: 'Bem não encontrado.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processesCodevasfService.remove(id);
  }
}
