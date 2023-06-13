import { IsArray, IsNotEmpty, IsString } from 'class-validator';
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

  @IsArray()
  @IsNotEmpty()
  categoryIds: string[];
}
