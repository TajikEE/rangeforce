import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { DIFFICULTIES } from '../constants/learing-module-difficulty';

export type LearningModuleDocument = HydratedDocument<LearningModule>;

@Schema()
export class LearningModule {
  @Prop({ required: true })
  name: string;

  @Prop()
  type: string;

  @Prop({ enum: DIFFICULTIES })
  difficulty: string;

  @Prop()
  description?: string;
}

export const LearningModuleSchema =
  SchemaFactory.createForClass(LearningModule);
