import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { LearningModuleService } from './learning-module.service';
import { UpdateLearningModuleDto } from './dto/update-learning-module.dto';
import { CreateLearningModuleDto } from './dto/create-learning-module.dto';

@Controller('learning-module')
export class LearningModuleController {
  constructor(private readonly learningModuleService: LearningModuleService) {}

  @Post()
  create(@Body() createLearningModuleDto: CreateLearningModuleDto) {
    return this.learningModuleService.create(createLearningModuleDto);
  }

  @Patch(':_id')
  update(
    @Param('_id') _id: string,
    @Body() updateLearningModuleDto: UpdateLearningModuleDto,
  ) {
    return this.learningModuleService.update(_id, updateLearningModuleDto);
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
