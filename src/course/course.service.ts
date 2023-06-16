import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './schemas/course.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LearningModuleService } from 'src/learning-module/learning-module.service';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
    private learningModuleService: LearningModuleService,
    private categoryService: CategoryService,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const createdCourse = new this.courseModel({
      name: createCourseDto.name,
      description: createCourseDto.description,
      learningModuleIds: createCourseDto.learningModuleIds,
      ...(createCourseDto.categoryIds && {
        categoryIds: createCourseDto.categoryIds.map(
          (_id) => new Types.ObjectId(_id),
        ),
      }),
    });

    if (createCourseDto.categoryIds) {
      const categoryNames = await this.categoryService.getCategoryNames(
        createCourseDto.categoryIds,
      );

      this.learningModuleService.updateLearningModuleCategories(
        createCourseDto.learningModuleIds.map((_id) => new Types.ObjectId(_id)),
        categoryNames,
      );
    }
    return await createdCourse.save();
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
