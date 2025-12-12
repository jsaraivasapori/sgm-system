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
import { SupportersService } from './supporters.service';
import { CreateSupporterDto } from './dto/create-supporter.dto';
import { UpdateSupporterDto } from './dto/update-supporter.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Supporter } from './entities/supporter.entity';
import { SupporterRole } from 'common/enums/supporter-type.enum';
import { GetSupportersFilterDto } from './dto/create-supporter-filter.dto';

@ApiTags('Supporters')
@ApiBearerAuth('access-token')
@Controller('supporters')
export class SupportersController {
  constructor(private readonly supportersService: SupportersService) {}

  @Post()
  @ApiResponse({ status: 201, type: Supporter })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createSupporterDto: CreateSupporterDto) {
    return this.supportersService.create(createSupporterDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Cadastrar novo apoiador (opcional: filtrar por cargo)',
  })
  @ApiQuery({
    name: 'role',
    enum: SupporterRole,
    required: false,
    description: 'Filtrar por cargo político',
  })
  @ApiOperation({ summary: 'Listar todos os apoiadores ativos' })
  @ApiResponse({
    status: 200,
    description: 'Lista retornada com sucesso.',
    type: [Supporter],
  })
  findAll(@Query() filterDto: GetSupportersFilterDto) {
    return this.supportersService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um apoiador pelo ID' })
  @ApiParam({
    name: 'id',
  })
  findOne(@Param('id') id: string) {
    return this.supportersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados do apoiador' })
  update(
    @Param('id') id: string,
    @Body() updateSupporterDto: UpdateSupporterDto,
  ) {
    return this.supportersService.update(id, updateSupporterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover apoiador (Logicamente)' })
  remove(@Param('id') id: string) {
    return this.supportersService.remove(id);
  }
}
