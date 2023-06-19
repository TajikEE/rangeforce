import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type UsageDocument = HydratedDocument<Usage>;

@Schema({ timestamps: true })
export class Usage {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'LearningModule' })
  learningModuleId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' }) // there is no user model, use any mongo id to test
  userId: string;
}

export const UsageSchema = SchemaFactory.createForClass(Usage);
