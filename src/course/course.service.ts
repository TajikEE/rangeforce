import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
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
    const createdCourse = new this.courseModel(createCourseDto);
    return await createdCourse.save();
  }

  async addLearningModuleToCourse(
    courseId: string,
    learningModuleId: string,
  ): Promise<ResponseCourseDto> {
    return await this.courseModel.findOneAndUpdate(
      { _id: courseId },
      { $addToSet: { learningModuleIds: learningModuleId } },
      { new: true },
    );
  }
}
