import { Test, TestingModule } from '@nestjs/testing';
import { UsageController } from './usage.controller';
import { UsageService } from './usage.service';
import { Usage } from './schemas/usage.schema';
import { LearningModule } from '../learning-module/schemas/learning-module.schema';
import { CreateUsageDto } from './dto/create-usage.dto';
import { ResponseUsageDto } from './dto/response-usage-dto';
import { Model, Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('UsageController', () => {
  let controller: UsageController;
  let service: UsageService;
  let usageModel: Model<Usage>;
  let learningModuleModel: Model<LearningModule>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsageController],
      providers: [
        UsageService,
        {
          provide: getModelToken(Usage.name),
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            aggregate: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: getModelToken(LearningModule.name),
          useValue: {
            collection: { name: 'learningModules' },
          },
        },
      ],
    }).compile();

    controller = module.get<UsageController>(UsageController);
    service = module.get<UsageService>(UsageService);
    usageModel = module.get<Model<Usage>>(getModelToken(Usage.name));
    learningModuleModel = module.get<Model<LearningModule>>(
      getModelToken(LearningModule.name),
    );
  });

  describe('create', () => {
    it('should create a new usage record', async () => {
      const createUsageDto: CreateUsageDto = {
        learningModuleId: 'mocked-learning-module-id',
        userId: 'mocked-user-id',
      };

      const expectedResult: ResponseUsageDto = {
        _id: new Types.ObjectId('648f7ddf31b8d62d324816e5'),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...createUsageDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult as any);

      const result = await controller.create(createUsageDto);

      expect(result).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createUsageDto);
    });
  });

  describe('findTopUsedModulesOfMonth', () => {
    it('should return an array of top used modules of the month', async () => {
      const limit = 10;
      const expectedResult: ResponseUsageDto[] = [
        {
          _id: new Types.ObjectId('648f7ddf31b8d62d324816e5'),
          createdAt: new Date(),
          updatedAt: new Date(),
          learningModuleId: 'mocked-learning-module-id-2',
          userId: 'mocked-user-id',
        },
        {
          _id: new Types.ObjectId('648f7ddf31b8d62d324816e7'),
          createdAt: new Date(),
          updatedAt: new Date(),
          learningModuleId: 'mocked-learning-module-id-2',
          userId: 'mocked-user-id-2',
        },
      ];

      jest
        .spyOn(service, 'findTopUsedModulesOfMonth')
        .mockResolvedValue(expectedResult as any);

      const result = await controller.findTopUsedModulesOfMonth(limit);

      expect(result).toBe(expectedResult);
      expect(service.findTopUsedModulesOfMonth).toHaveBeenCalledWith(limit);
    });
  });
});
