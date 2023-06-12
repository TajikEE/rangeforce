import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningModuleModule } from './learning-module/learning-module.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.7kp1zsq.mongodb.net/`,
    ),
    CourseModule,
    CategoryModule,
    LearningModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
