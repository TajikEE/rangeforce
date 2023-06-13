import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'LearningModule' }] })
  learningModuleIds: Types.ObjectId[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Category' }] })
  categoryIds: Types.ObjectId[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
