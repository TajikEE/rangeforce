import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Model, Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;
  let categoryModel: Model<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
        {
          provide: getModelToken(Category.name),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  describe('create', () => {
    it('should create a new category', () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'Test Category',
        description: 'Test category description',
      };

      const createdCategory = {
        _id: new Types.ObjectId('648f7ddf31b8d62d324816e5'),
        ...createCategoryDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdCategory as any);

      expect(controller.create(createCategoryDto)).resolves.toEqual(
        createdCategory,
      );
      expect(service.create).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe('addCourseToCategory', () => {
    it('should add a course to a category', () => {
      const categoryId = '648f7ddf31b8d62d324816e5';
      const courseId = '648f7ddf31b8d62d324816e7';

      const updatedCategory = {
        _id: new Types.ObjectId('648f7ddf31b8d62d324816e5'),
        name: 'Test Category',
        description: 'Test category description',
      };

      jest
        .spyOn(service, 'addCourseToCategory')
        .mockResolvedValue(updatedCategory);

      expect(
        controller.addCourseToCategory(categoryId, courseId),
      ).resolves.toEqual(updatedCategory);
      expect(service.addCourseToCategory).toHaveBeenCalledWith(
        categoryId,
        courseId,
      );
    });
  });
});
