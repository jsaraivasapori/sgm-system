import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Good } from './entities/good.entity';
@ApiTags('Goods')
@ApiBearerAuth('access-token')
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo bem' })
  @ApiResponse({
    status: 201,
    description: 'Bem criado com sucesso.',
    type: Good,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createGoodDto: CreateGoodDto) {
    return this.goodsService.create(createGoodDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os bens ativos' })
  @ApiResponse({
    status: 200,
    description: 'Lista retornada com sucesso.',
    type: [Good],
  })
  findAll() {
    return this.goodsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um bem pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID do bem',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @ApiResponse({ status: 200, description: 'Bem encontrado.', type: Good })
  @ApiResponse({ status: 404, description: 'Bem não encontrado ou inativo.' })
  @ApiResponse({ status: 400, description: 'ID inválido (não é UUID).' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.goodsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de um bem' })
  @ApiResponse({
    status: 200,
    description: 'Bem atualizado com sucesso.',
    type: Good,
  })
  @ApiResponse({ status: 404, description: 'Bem não encontrado.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGoodDto: UpdateGoodDto,
  ) {
    return this.goodsService.update(id, updateGoodDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 (Sucesso, sem conteúdo) ao deletar
  @ApiOperation({ summary: 'Deletar (Soft Delete) um bem' })
  @ApiResponse({
    status: 204,
    description: 'Bem removido com sucesso (sem retorno).',
  })
  @ApiResponse({ status: 404, description: 'Bem não encontrado.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.goodsService.remove(id);
  }
}
