import { Module } from '@nestjs/common';
import { UsageService } from './usage.service';
import { UsageController } from './usage.controller';
import { Usage, UsageSchema } from './schemas/usage.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningModule, LearningModuleSchema } from 'src/learning-module/schemas/learning-module.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usage.name, schema: UsageSchema }]),
    MongooseModule.forFeature([
      { name: LearningModule.name, schema: LearningModuleSchema },
    ]),
  ],
  controllers: [UsageController],
  providers: [UsageService],
})
export class UsageModule {}
