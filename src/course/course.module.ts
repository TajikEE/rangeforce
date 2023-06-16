import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course, CourseSchema } from './schemas/course.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningModuleService } from 'src/learning-module/learning-module.service';
import {
  LearningModule,
  LearningModuleSchema,
} from 'src/learning-module/schemas/learning-module.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([
      { name: LearningModule.name, schema: LearningModuleSchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService, LearningModuleService],
})
export class CourseModule {}
