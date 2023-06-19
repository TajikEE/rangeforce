import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseCategoryDto } from './dto/response-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseCategoryDto> {
    try {
      return await this.categoryModel.create(createCategoryDto);
    } catch (error) {
      throw new InternalServerErrorException('Error creating category');
    }
  }

  async addCourseToCategory(
    categoryId: string,
    courseId: string,
  ): Promise<ResponseCategoryDto> {
    try {
      return await this.categoryModel.findOneAndUpdate(
        { _id: categoryId },
        { $addToSet: { courseIds: courseId } },
        { new: true },
      );
    } catch (error) {
      throw new InternalServerErrorException('Error adding course to category');
    }
  }
}
