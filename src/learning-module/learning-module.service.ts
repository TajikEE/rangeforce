import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLearningModuleDto } from './dto/create-learning-module.dto';
import { LearningModule } from './schemas/learning-module.schema';
import { Types } from 'mongoose';

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
      categoryIds: createLearningModuleDto.categoryIds.map(
        (id) => new Types.ObjectId(id),
      ),
    });
    return await createdLearningModule.save();
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
