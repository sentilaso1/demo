import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { GoalSkillsService } from './goal-skills.service';
import { GoalSkillsRepository } from './goal-skills.repository';
import { GoalSkill } from './entities/goal-skill.entity';

describe('GoalSkillsService', () => {
  let service: GoalSkillsService;
  const repo = {
    findByGoalAndSkill: jest.fn(),
    createGoalSkill: jest.fn(),
    findByGoal: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoalSkillsService,
        { provide: GoalSkillsRepository, useValue: repo },
      ],
    }).compile();

    service = module.get<GoalSkillsService>(GoalSkillsService);
    jest.clearAllMocks();
  });

  it('should not allow duplicate skill', async () => {
    repo.findByGoalAndSkill.mockResolvedValue({} as GoalSkill);
    await expect(
      service.addSkill(1, { skillId: 1, startLevel: 'Beginner' } as any),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it('should return list by goal', async () => {
    const list = [{} as GoalSkill];
    repo.findByGoal.mockResolvedValue(list);
    const result = await service.listByGoal(1);
    expect(result).toBe(list);
  });

  it('should throw when removing missing skill', async () => {
    repo.findByGoalAndSkill.mockResolvedValue(null);
    await expect(service.removeSkill(1, 2)).rejects.toBeInstanceOf(
      HttpException,
    );
  });
});
