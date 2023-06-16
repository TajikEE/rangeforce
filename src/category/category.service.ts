import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = new this.categoryModel({
      name: createCategoryDto.name,
      description: createCategoryDto.description,
    });
    return await createdCategory.save();
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
