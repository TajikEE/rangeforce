import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseLearningModuleDto {
  @ApiProperty({
    example: '5f9d5f8a6d7f7f0017b0b0b0',
  })
  @IsString()
  @IsNotEmpty()
  _id: Types.ObjectId;

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
  difficulty: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}
