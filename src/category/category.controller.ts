import { Controller, Post, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ResponseCategoryDto } from './dto/response-category.dto';
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBody({ type: CreateCategoryDto })
  @ApiCreatedResponse({ type: ResponseCategoryDto })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Post(':categoryId/courses')
  @ApiParam({ name: 'categoryId', type: String })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        courseId: {
          type: 'string',
          example: '5f9d5f8a6d7f7f0017b0b0b0',
        },
      },
    },
  })
  @ApiCreatedResponse({ type: ResponseCategoryDto })
  addCourseToCategory(
    @Param('categoryId') categoryId: string,
    @Body('courseId') courseId: string,
  ) {
    return this.categoryService.addCourseToCategory(categoryId, courseId);
  }
}
