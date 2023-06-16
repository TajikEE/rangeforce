import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateLearningModuleDto } from './dto/update-learning-module.dto';
import { CreateLearningModuleDto } from './dto/create-learning-module.dto';
import { LearningModule } from './schemas/learning-module.schema';

@Injectable()
export class LearningModuleService {
  constructor(
    @InjectModel(LearningModule.name)
    private learningModuleModel: Model<LearningModule>,
  ) {}
  async create(createLearningModuleDto: CreateLearningModuleDto) {
    const createdLearningModule = new this.learningModuleModel({
      name: createLearningModuleDto.name,
      description: createLearningModuleDto.description,
      difficulty: createLearningModuleDto.difficulty,
      ...(createLearningModuleDto.categoryIds && {
        categoryIds: createLearningModuleDto.categoryIds.map(
          (_id) => new Types.ObjectId(_id),
        ),
      }),
    });
    return await createdLearningModule.save();
  }

  async updateLearningModuleCategories(
    learningModuleIds: Types.ObjectId[],
    categoryIds: Types.ObjectId[],
  ): Promise<void> {
    const learningModules = await this.learningModuleModel
      .find({
        _id: { $in: learningModuleIds },
      })
      .exec();
    learningModules.forEach(async (module) => {
      await this.learningModuleModel.updateOne(
        { _id: module._id },
        { $addToSet: { categoryIds: { $each: categoryIds } } },
      );
    });
  }

  async update(_id: string, updateLearningModuleDto: UpdateLearningModuleDto) {
    return await this.learningModuleModel.findByIdAndUpdate(
      _id,
      {
        name: updateLearningModuleDto.name,
        description: updateLearningModuleDto.description,
        difficulty: updateLearningModuleDto.difficulty,
        ...(updateLearningModuleDto.categoryIds && {
          categoryIds: updateLearningModuleDto.categoryIds.map(
            (_id) => new Types.ObjectId(_id),
          ),
        }),
      },
      { new: true },
    );
  }

  async getLearningModulesByCategory(categoryName: string): Promise<any[]> {
    return;
  }

  async getTopTenUsedModulesOfMonth(): Promise<any[]> {
    return;
  }

  findAll() {
    return `This action returns all learningModule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learningModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} learningModule`;
  }
}
