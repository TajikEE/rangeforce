import { Injectable } from '@nestjs/common';
import { CreateUsageDto } from './dto/create-usage.dto';
import { UpdateUsageDto } from './dto/update-usage.dto';
import { Usage } from './schemas/usage.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsageService {
  constructor(
    @InjectModel(Usage.name)
    private usageModel: Model<Usage>,
  ) {}

  async create(createUsageDto: CreateUsageDto) {
    const createdUsage = new this.usageModel({
      moduleId: createUsageDto.moduleId,
      userId: createUsageDto.userId,
    });
    return await createdUsage.save();
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
