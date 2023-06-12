import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';

export type LearningModuleDocument = HydratedDocument<LearningModule>;

@Schema()
export class LearningModule {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ enum: ['Easy', 'Medium', 'Hard'] })
  difficulty: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Category' }] })
  categories: Category[];
}

export const LearningModuleSchema =
  SchemaFactory.createForClass(LearningModule);
