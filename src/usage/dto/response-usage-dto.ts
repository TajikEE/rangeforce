import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUsageDto } from './create-usage.dto';
import { Types } from 'mongoose';

export class ResponseUsageDto extends CreateUsageDto {
  @ApiProperty({
    example: '5f9d5f8a6d7f7f0017b0b0b0',
  })
  @IsNotEmpty()
  _id: Types.ObjectId;

  @ApiProperty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @IsDateString()
  updatedAt: Date;
}
