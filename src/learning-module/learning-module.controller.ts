import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LearningModuleService } from './learning-module.service';
import { CreateLearningModuleDto } from './dto/create-learning-module.dto';

@Controller('learning-module')
export class LearningModuleController {
  constructor(private readonly learningModuleService: LearningModuleService) {}

  @Post()
  create(@Body() createLearningModuleDto: CreateLearningModuleDto) {
    return this.learningModuleService.create(createLearningModuleDto);
  }

  @Get()
  findAll() {
    return this.learningModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learningModuleService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learningModuleService.remove(+id);
  }
}
