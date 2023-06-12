import { Module } from '@nestjs/common';
import { LearningModuleService } from './learning-module.service';
import { LearningModuleController } from './learning-module.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LearningModule,
  LearningModuleSchema,
} from './schemas/learning-module.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LearningModule.name, schema: LearningModuleSchema },
    ]),
  ],
  controllers: [LearningModuleController],
  providers: [LearningModuleService],
})
export class LearningModuleModule {}
