import { Module } from '@nestjs/common';
import { LearningModuleService } from './learning-module.service';
import { LearningModuleController } from './learning-module.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LearningModule,
  LearningModuleSchema,
} from './schemas/learning-module.schema';
import { Category, CategorySchema } from 'src/category/schemas/category.schema';
import { Course, CourseSchema } from 'src/course/schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LearningModule.name, schema: LearningModuleSchema },
    ]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  controllers: [LearningModuleController],
  providers: [LearningModuleService],
  exports: [LearningModuleService],
})
export class LearningModuleModule {}
