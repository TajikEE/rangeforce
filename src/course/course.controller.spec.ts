import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { ResponseCourseDto } from './dto/response-course.dto';
import { Model, Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Category } from '../category/schemas/category.schema';
import { LearningModule } from '../learning-module/schemas/learning-module.schema';
import { Course } from './schemas/course.schema';

describe('CourseController', () => {
  let controller: CourseController;
  let service: CourseService;
  let learningModuleModel: Model<LearningModule>;
  let categoryModel: Model<Category>;
  let courseModel: Model<Course>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        CourseService,
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

    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a course', async () => {
      const createCourseDto: CreateCourseDto = {
        name: 'mocked-name',
        description: 'mocked-description',
        learningModuleIds: ['648f83db01f11fa7e66345ee'],
      };
      const expectedResponse: ResponseCourseDto = {
        _id: new Types.ObjectId('648f7ddf31b8d62d324816e5'),
        ...createCourseDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResponse as any);

      const result = await controller.create(createCourseDto);

      expect(service.create).toHaveBeenCalledWith(createCourseDto);
      expect(result).toBe(expectedResponse);
    });
  });

  describe('addLearningModuleToCourse', () => {
    it('should add a learning module to a course', async () => {
      const courseId = 'courseId';
      const learningModuleId = 'learningModuleId';
      const expectedResponse: ResponseCourseDto = {
        name: 'mocked-name',
        _id: new Types.ObjectId('648f7ddf31b8d62d324816e5'),
        learningModuleIds: ['648f83db01f11fa7e66345ee'],
      };

      jest
        .spyOn(service, 'addLearningModuleToCourse')
        .mockResolvedValue(expectedResponse);

      const result = await controller.addLearningModuleToCourse(
        courseId,
        learningModuleId,
      );

      expect(service.addLearningModuleToCourse).toHaveBeenCalledWith(
        courseId,
        learningModuleId,
      );
      expect(result).toBe(expectedResponse);
    });
  });
});
