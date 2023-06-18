import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { LearningModuleService } from './learning-module.service';
import { UpdateLearningModuleDto } from './dto/update-learning-module.dto';
import { CreateLearningModuleDto } from './dto/create-learning-module.dto';
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ResponseLearningModuleDto } from './dto/response-learning-module.dto';

@ApiTags('Learning module')
@Controller('learning-module')
export class LearningModuleController {
  constructor(private readonly learningModuleService: LearningModuleService) {}

  @Post()
  @ApiBody({ type: CreateLearningModuleDto })
  @ApiCreatedResponse({ type: ResponseLearningModuleDto })
  create(
    @Body() createLearningModuleDto: CreateLearningModuleDto,
  ): Promise<ResponseLearningModuleDto> {
    return this.learningModuleService.create(createLearningModuleDto);
  }

  @Patch(':_id')
  @ApiBody({ type: UpdateLearningModuleDto })
  @ApiCreatedResponse({ type: ResponseLearningModuleDto })
  update(
    @Param('_id') _id: string,
    @Body() updateLearningModuleDto: UpdateLearningModuleDto,
  ) {
    return this.learningModuleService.update(_id, updateLearningModuleDto);
  }

  @Get()
  @ApiQuery({ name: 'categoryName', type: String })
  @ApiCreatedResponse({ type: ResponseLearningModuleDto, isArray: true })
  findByCategoryName(@Query('categoryName') categoryName: string) {
    return this.learningModuleService.findByCategoryName(categoryName);
  }
}
