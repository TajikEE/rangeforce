import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Course' }] })
  courseIds?: Types.ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
