import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateLearningModuleDto } from './dto/update-learning-module.dto';
import { CreateLearningModuleDto } from './dto/create-learning-module.dto';
import { LearningModule } from './schemas/learning-module.schema';
import { ResponseLearningModuleDto } from './dto/response-learning-module.dto';
import { Category } from 'src/category/schemas/category.schema';
import { Course } from 'src/course/schemas/course.schema';

@Injectable()
export class LearningModuleService {
  constructor(
    @InjectModel(LearningModule.name)
    private readonly learningModuleModel: Model<LearningModule>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    @InjectModel(Course.name)
    private readonly courseModel: Model<Course>,
  ) {}
  async create(
    createLearningModuleDto: CreateLearningModuleDto,
  ): Promise<ResponseLearningModuleDto> {
    const createdLearningModule = new this.learningModuleModel(
      createLearningModuleDto,
    );
    return await createdLearningModule.save();
  }

  async update(_id: string, updateLearningModuleDto: UpdateLearningModuleDto) {
    return await this.learningModuleModel.findByIdAndUpdate(
      _id,
      updateLearningModuleDto,
      { new: true },
    );
  }

  async findByCategoryName(
    categoryName: string,
  ): Promise<ResponseLearningModuleDto[]> {
    const regex = new RegExp(categoryName, 'i');
    const category = await this.categoryModel.findOne({
      name: regex,
    });

    if (!category || !category.courseIds.length) {
      throw new NotFoundException('Category not found or empty courses');
    }

    const courses = await this.courseModel.find({
      _id: { $in: category.courseIds },
    });

    const learningModules = await this.learningModuleModel.find({
      _id: { $in: courses.map((course) => course.learningModuleIds) },
    });

    if (!learningModules.length) {
      throw new NotFoundException('Learning modules not found');
    }

    return learningModules;
  }
}
