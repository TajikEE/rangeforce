import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type UsageDocument = HydratedDocument<Usage>;

@Schema()
export class Usage {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'LearningModule' })
  moduleId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const UsageSchema = SchemaFactory.createForClass(Usage);
