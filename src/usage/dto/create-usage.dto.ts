import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUsageDto {
  @IsString()
  @IsNotEmpty()
  moduleId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
