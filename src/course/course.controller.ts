import { Controller, Post, Body, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { ResponseCourseDto } from './dto/response-course.dto';
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiBody({ type: CreateCourseDto })
  @ApiCreatedResponse({ type: ResponseCourseDto })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Post(':courseId/learning-module')
  @ApiParam({ name: 'courseId', type: String })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        learningModuleId: {
          type: 'string',
          example: '5f9d5f8a6d7f7f0017b0b0b0',
        },
      },
    },
  })
  @ApiCreatedResponse({ type: ResponseCourseDto })
  addLearningModuleToCourse(
    @Param('courseId') courseId: string,
    @Body('learningModuleId') learningModuleId: string,
  ) {
    return this.courseService.addLearningModuleToCourse(
      courseId,
      learningModuleId,
    );
  }
}
