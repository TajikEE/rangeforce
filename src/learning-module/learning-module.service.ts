import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateLearningModuleDto } from './dto/update-learning-module.dto';
import { CreateLearningModuleDto } from './dto/create-learning-module.dto';
import { LearningModule } from './schemas/learning-module.schema';
import { ResponseLearningModuleDto } from './dto/response-learning-module.dto';
import { Category } from '../category/schemas/category.schema';
import { Course } from '../course/schemas/course.schema';

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
    try {
      return await this.learningModuleModel.create(createLearningModuleDto);
    } catch (error) {
      throw new InternalServerErrorException('Error creating learning module');
    }
  }

  async update(_id: string, updateLearningModuleDto: UpdateLearningModuleDto) {
    try {
      return await this.learningModuleModel.findByIdAndUpdate(
        _id,
        updateLearningModuleDto,
        { new: true },
      );
    } catch (error) {
      throw new InternalServerErrorException('Error updating learning module');
    }
  }

  async findByCategoryName(
    categoryName: string,
  ): Promise<ResponseLearningModuleDto[] | NotFoundException> {
    try {
      const regex = new RegExp(categoryName, 'i');
      const category = await this.categoryModel.findOne({
        name: regex,
      });

      if (!category || !category.courseIds.length) {
        return new NotFoundException('Category not found or empty courses');
      }

      const courses = await this.courseModel.find({
        _id: { $in: category.courseIds },
      });

      const learningModules = await this.learningModuleModel.find({
        _id: { $in: courses.flatMap((course) => course.learningModuleIds) },
      });

      if (!learningModules.length) {
        return new NotFoundException('Learning modules not found');
      }

      return learningModules;
    } catch (error) {
      throw new InternalServerErrorException('Error finding learning modules');
    }
  }
}
