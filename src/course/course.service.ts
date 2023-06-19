import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './schemas/course.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ResponseCourseDto } from './dto/response-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      return await this.courseModel.create(createCourseDto);
    } catch (error) {
      throw new InternalServerErrorException('Error creating course');
    }
  }

  async addLearningModuleToCourse(
    courseId: string,
    learningModuleId: string,
  ): Promise<ResponseCourseDto> {
    try {
      return await this.courseModel.findOneAndUpdate(
        { _id: courseId },
        { $addToSet: { learningModuleIds: learningModuleId } },
        { new: true },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Error adding learning module to course',
      );
    }
  }
}
