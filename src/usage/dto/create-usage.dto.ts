import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  learningModuleId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
