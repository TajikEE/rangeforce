import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './schemas/course.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
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
