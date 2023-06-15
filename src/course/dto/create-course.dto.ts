import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsArray()
  learningModuleIds: string[];

  @IsOptional()
  @IsArray()
  categoryIds?: string[];
}
