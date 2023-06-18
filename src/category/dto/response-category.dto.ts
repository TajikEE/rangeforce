import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseCategoryDto {
  @ApiProperty({
    example: '5f9d5f8a6d7f7f0017b0b0b0',
  })
  @IsNotEmpty()
  _id: Types.ObjectId;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  courseIds?: Types.ObjectId[];
}
