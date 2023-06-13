import { Module } from '@nestjs/common';
import { UsageService } from './usage.service';
import { UsageController } from './usage.controller';
import { Usage, UsageSchema } from './schemas/usage.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usage.name, schema: UsageSchema }]),
  ],
  controllers: [UsageController],
  providers: [UsageService],
})
export class UsageModule {}
