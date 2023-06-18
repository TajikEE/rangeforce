import { Injectable } from '@nestjs/common';
import { CreateUsageDto } from './dto/create-usage.dto';
import { UpdateUsageDto } from './dto/update-usage.dto';
import { Usage } from './schemas/usage.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LearningModule } from '../learning-module/schemas/learning-module.schema';

@Injectable()
export class UsageService {
  constructor(
    @InjectModel(Usage.name)
    private readonly usageModel: Model<Usage>,

    @InjectModel(LearningModule.name)
    private readonly learningModuleModel: Model<LearningModule>,
  ) {}

  async create(createUsageDto: CreateUsageDto) {
    return await this.usageModel.create(createUsageDto);
  }

  async findTopUsedModulesOfMonth(limit: number): Promise<any[]> {
    const result = await this.usageModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          },
        },
      },
      {
        $group: {
          _id: '$learningModuleId',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: this.learningModuleModel.collection.name,
          localField: '_id',
          foreignField: '_id',
          as: 'learningModule',
        },
      },
      {
        $unwind: '$learningModule',
      },
      {
        $project: {
          _id: 0,
          learningModule: 1,
          count: 1,
        },
      },
    ]);

    return result;
  }

  findAll() {
    return `This action returns all usage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usage`;
  }

  update(id: number, updateUsageDto: UpdateUsageDto) {
    return `This action updates a #${id} usage`;
  }

  remove(id: number) {
    return `This action removes a #${id} usage`;
  }
}
