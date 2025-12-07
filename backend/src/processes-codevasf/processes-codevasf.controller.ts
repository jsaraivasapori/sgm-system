import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcessesCodevasfService } from './processes-codevasf.service';
import { CreateProcessesCodevasfDto } from './dto/create-processes-codevasf.dto';
import { UpdateProcessesCodevasfDto } from './dto/update-processes-codevasf.dto';

@Controller('processes-codevasf')
export class ProcessesCodevasfController {
  constructor(private readonly processesCodevasfService: ProcessesCodevasfService) {}

  @Post()
  create(@Body() createProcessesCodevasfDto: CreateProcessesCodevasfDto) {
    return this.processesCodevasfService.create(createProcessesCodevasfDto);
  }

  @Get()
  findAll() {
    return this.processesCodevasfService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processesCodevasfService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcessesCodevasfDto: UpdateProcessesCodevasfDto) {
    return this.processesCodevasfService.update(+id, updateProcessesCodevasfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processesCodevasfService.remove(+id);
  }
}
