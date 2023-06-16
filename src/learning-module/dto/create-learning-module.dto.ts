import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { DIFFICULTIES } from '../constants/learing-module-difficulty';
export class CreateLearningModuleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsEnum(DIFFICULTIES)
  difficulty: string;

  @IsOptional()
  @IsArray()
  categoryNames?: string[];
}
