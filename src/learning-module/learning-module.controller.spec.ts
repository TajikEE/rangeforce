import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LearningModuleService } from './learning-module.service';
import { CreateLearningModuleDto } from './dto/create-learning-module.dto';
import { UpdateLearningModuleDto } from './dto/update-learning-module.dto';
import { LearningModule } from './schemas/learning-module.schema';
import { Category } from '../category/schemas/category.schema';
import { Course } from '../course/schemas/course.schema';
import { ResponseLearningModuleDto } from './dto/response-learning-module.dto';
import { LearningModuleController } from './learning-module.controller';

describe('LearningModuleControlller', () => {
  let controller: LearningModuleController;
  let service: LearningModuleService;
  let learningModuleModel: Model<LearningModule>;
  let categoryModel: Model<Category>;
  let courseModel: Model<Course>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningModuleController],
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

    controller = module.get<LearningModuleController>(LearningModuleController);
    service = module.get<LearningModuleService>(LearningModuleService);
    learningModuleModel = module.get<Model<LearningModule>>(
      getModelToken(LearningModule.name),
    );
    categoryModel = module.get<Model<Category>>(getModelToken(Category.name));
    courseModel = module.get<Model<Course>>(getModelToken(Course.name));
  });

  describe('create', () => {
    it('should create a new learning module', async () => {
      const createLearningModuleDto: CreateLearningModuleDto = {
        name: 'mocked-name',
        type: 'mocked-type',
        difficulty: 'Easy',
        description: 'mocked-description',
      };

      const expectedResult: ResponseLearningModuleDto = {
        _id: new Types.ObjectId('648f7ddf31b8d62d324816e5'),
        ...createLearningModuleDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(createLearningModuleDto);

      expect(result).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createLearningModuleDto);
    });
  });

  describe('update', () => {
    it('should update a learning module', async () => {
      const moduleId = 'mocked-module-id';
      const updateLearningModuleDto: UpdateLearningModuleDto = {
        name: 'mocked-name',
        type: 'mocked-type',
        difficulty: 'Easy',
        description: 'mocked-description',
      };

      const expectedResult: ResponseLearningModuleDto = {
        _id: new Types.ObjectId('648f7ddf31b8d62d324816e5'),
        ...updateLearningModuleDto,
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedResult as any);

      const result = await controller.update(moduleId, updateLearningModuleDto);

      expect(result).toBe(expectedResult);
      expect(service.update).toHaveBeenCalledWith(
        moduleId,
        updateLearningModuleDto,
      );
    });
  });

  describe('findByCategoryName', () => {
    it('should find learning modules by category name', async () => {
      const categoryName = 'mocked-category-name';

      const expectedResult: ResponseLearningModuleDto[] = [
        {
          _id: new Types.ObjectId('648f7ddf31b8d62d324816e5'),
          name: 'mocked-name',
          type: 'mocked-type',
          difficulty: 'Easy',
          description: 'mocked-description',
        },
      ];

      jest
        .spyOn(service, 'findByCategoryName')
        .mockResolvedValue(expectedResult);

      const result = await controller.findByCategoryName(categoryName);

      expect(result).toBe(expectedResult);
      expect(service.findByCategoryName).toHaveBeenCalledWith(categoryName);
    });
  });
});
