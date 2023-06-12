import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLearningModuleDto } from './dto/create-learning-module.dto';
import { UpdateLearningModuleDto } from './dto/update-learning-module.dto';
import { LearningModule } from './schemas/learning-module.schema';

@Injectable()
export class LearningModuleService {
  constructor(
    @InjectModel(LearningModule.name)
    private learningModuleModel: Model<LearningModule>,
  ) {}
  async create(createLearningModuleDto: CreateLearningModuleDto) {
    const createdLearningModule = new this.learningModuleModel(
      createLearningModuleDto,
    );
    return await createdLearningModule.save();
  }

  findAll() {
    return `This action returns all learningModule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learningModule`;
  }

  update(id: number, updateLearningModuleDto: UpdateLearningModuleDto) {
    return `This action updates a #${id} learningModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} learningModule`;
  }
}