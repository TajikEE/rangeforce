import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { LearningModuleService } from './learning-module.service';
import { CreateLearningModuleDto } from './dto/create-learning-module.dto';
import { UpdateLearningModuleDto } from './dto/update-learning-module.dto';
import { LearningModule } from './schemas/learning-module.schema';
import { Category } from '../category/schemas/category.schema';
import { Course } from '../course/schemas/course.schema';

describe('LearningModuleService', () => {
  let service: LearningModuleService;
  let learningModuleModel: Model<LearningModule>;
  let categoryModel: Model<Category>;
  let courseModel: Model<Course>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LearningModuleService,
        {
          provide: getModelToken(LearningModule.name),
          useValue: {
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: getModelToken(Category.name),
          useValue: Model,
        },
        {
          provide: getModelToken(Course.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<LearningModuleService>(LearningModuleService);
    learningModuleModel = module.get<Model<LearningModule>>(
      getModelToken(LearningModule.name),
    );
    categoryModel = module.get<Model<Category>>(getModelToken(Category.name));
    courseModel = module.get<Model<Course>>(getModelToken(Course.name));
  });

  describe('create', () => {
    it('should create a new learning module', async () => {
      const createDto: CreateLearningModuleDto = {
        name: 'Example Learning Module',
        type: 'Module Type',
        difficulty: 'Module Difficulty',
      };

      await service.create(createDto);

      expect(learningModuleModel.create).toHaveBeenCalledTimes(1);
      expect(learningModuleModel.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('update', () => {
    it('should update the learning module', async () => {
      const _id = '123';
      const updateDto: UpdateLearningModuleDto = {
        name: 'Updated Learning Module',
        type: 'Updated Type',
        difficulty: 'Updated Difficulty',
      };

      const mockFindByIdAndUpdate = jest.fn().mockResolvedValue(updateDto);
      jest
        .spyOn(learningModuleModel, 'findByIdAndUpdate')
        .mockImplementation(mockFindByIdAndUpdate);

      const result = await service.update(_id, updateDto);

      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(_id, updateDto, {
        new: true,
      });
      expect(result).toEqual(updateDto);
    });
  });

  describe('findByCategoryName', () => {
    it('should find learning modules by category name', async () => {
      const categoryName = 'Example Category';
      const category = {
        name: categoryName,
        courseIds: ['courseId1', 'courseId2'],
      };
      const courses = [
        { _id: 'courseId1', learningModuleIds: ['learningModuleId1'] },
        { _id: 'courseId2', learningModuleIds: ['learningModuleId2'] },
      ];
      const learningModules = [
        {
          _id: 'learningModuleId1',
          name: 'Learning Module 1',
          type: 'Type 1',
          difficulty: 'Easy',
        },
        {
          _id: 'learningModuleId2',
          name: 'Learning Module 2',
          type: 'Type 2',
          difficulty: 'Medium',
        },
      ];

      jest.spyOn(categoryModel, 'findOne').mockResolvedValue(category);
      jest.spyOn(courseModel, 'find').mockResolvedValue(courses);
      jest
        .spyOn(learningModuleModel, 'find')
        .mockResolvedValue(learningModules);

      await service.findByCategoryName(categoryName);

      expect(categoryModel.findOne).toHaveBeenCalledWith({
        name: new RegExp(categoryName, 'i'),
      });
      expect(courseModel.find).toHaveBeenCalledWith({
        _id: { $in: category.courseIds },
      });
    });

    it('should return NotFoundException when category is not found', async () => {
      const categoryName = 'Nonexistent Category';

      jest.spyOn(categoryModel, 'findOne').mockResolvedValue(null);

      await expect(
        service.findByCategoryName(categoryName),
      ).resolves.toThrowError(NotFoundException);
      expect(categoryModel.findOne).toHaveBeenCalledWith({
        name: new RegExp(categoryName, 'i'),
      });
    });
  });
});
