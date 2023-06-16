import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUsageDto {
  @IsString()
  @IsNotEmpty()
  learningModuleId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
