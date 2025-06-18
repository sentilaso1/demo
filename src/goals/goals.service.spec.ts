import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsRepository } from './goals.repository';
import { Goal } from './entities/goal.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

describe('GoalsService', () => {
  let service: GoalsService;
  const repo = {
    findAll: jest.fn(),
    findById: jest.fn(),
    createGoal: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };
  const usersSvc = { findOne: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoalsService,
        { provide: GoalsRepository, useValue: repo },
        { provide: UsersService, useValue: usersSvc },
      ],
    }).compile();

    service = module.get<GoalsService>(GoalsService);
    jest.clearAllMocks();
  });

  it('should create a goal', async () => {
    const goal = { id: 1 } as Goal;
    usersSvc.findOne.mockResolvedValue({ id: 'u1' } as User);
    repo.createGoal.mockResolvedValue(goal);
    const result = await service.create({
      userId: 'u1',
      title: 'Learn',
    });
    expect(result).toBe(goal);
  });

  it('should throw error if user missing', async () => {
    usersSvc.findOne.mockRejectedValue(new HttpException('', 404));
    await expect(
      service.create({ userId: 'u1', title: 'x' }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
