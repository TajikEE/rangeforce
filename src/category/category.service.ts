import { Injectable } from '@nestjs/common';
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
    const createdCategory = new this.categoryModel(createCategoryDto);
    return await createdCategory.save();
  }

  async addCourseToCategory(
    categoryId: string,
    courseId: string,
  ): Promise<ResponseCategoryDto> {
    return await this.categoryModel.findOneAndUpdate(
      { _id: categoryId },
      { $addToSet: { courseIds: courseId } },
      { new: true },
    );
  }

  async getCategoryNames(categoryIds: string[]): Promise<string[]> {
    const categories = await this.categoryModel
      .find({
        _id: { $in: categoryIds },
      })
      .exec();

    return categories.map((category) => category.name);
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
