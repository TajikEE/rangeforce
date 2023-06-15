import { CreateLearningModuleDto } from './create-learning-module.dto';
import { Types } from 'mongoose';

export class ResponseLearningModuleDto extends CreateLearningModuleDto {
  _id: Types.ObjectId;
}
