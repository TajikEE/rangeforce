import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateLearningModuleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  difficulty: string;

  @IsOptional()
  @IsArray()
  categoryIds?: string[];
}
