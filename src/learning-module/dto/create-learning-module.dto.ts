import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { DIFFICULTIES } from '../constants/learing-module-difficulty';
export class CreateLearningModuleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsString()
  @IsEnum(DIFFICULTIES)
  difficulty: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}
