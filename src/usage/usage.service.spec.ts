import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UsageService } from './usage.service';
import { Usage } from './schemas/usage.schema';
import { LearningModule } from '../learning-module/schemas/learning-module.schema';

describe('UsageService', () => {
  let service: UsageService;
  let usageModel: Model<Usage>;
  let learningModuleModel: Model<LearningModule>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<UsageService>(UsageService);
    usageModel = module.get<Model<Usage>>(getModelToken(Usage.name));
    learningModuleModel = module.get<Model<LearningModule>>(
      getModelToken(LearningModule.name),
    );
  });

  describe('create', () => {
    it('should create a usage', async () => {
      const createUsageDto = { learningModuleId: 'module1', userId: 'user1' };

      await service.create(createUsageDto);

      expect(usageModel.create).toHaveBeenCalledTimes(1);
      expect(usageModel.create).toHaveBeenCalledWith(createUsageDto);
    });
  });

  describe('findTopUsedModulesOfMonth', () => {
    it('should return the top used modules of the month', async () => {
      const limit = 5;
      const expectedAggregateResult = [
        { _id: 'module1', count: 10 },
        { _id: 'module2', count: 8 },
        { _id: 'module3', count: 6 },
      ];
      const expectedQueryResult = [
        { _id: 'module1', count: 10 },
        { _id: 'module2', count: 8 },
        { _id: 'module3', count: 6 },
      ];

      (usageModel.aggregate as jest.Mock).mockResolvedValue(
        expectedAggregateResult,
      );
      learningModuleModel.collection.name = 'learningModules';

      const result = await service.findTopUsedModulesOfMonth(limit);

      expect(usageModel.aggregate).toHaveBeenCalledTimes(1);
      expect(usageModel.aggregate).toHaveBeenCalledWith([
        { $match: { createdAt: { $gte: expect.any(Date) } } },
        { $group: { _id: '$learningModuleId', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: limit },
        {
          $lookup: {
            from: 'learningModules',
            localField: '_id',
            foreignField: '_id',
            as: 'learningModule',
          },
        },
        { $unwind: '$learningModule' },
        { $project: { _id: 0, learningModule: 1, count: 1 } },
      ]);
      expect(result).toEqual(expectedQueryResult);
    });
  });
});
