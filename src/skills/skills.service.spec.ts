import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsRepository } from './skills.repository';
import { Skill } from './entities/skill.entity';

describe('SkillsService', () => {
  let service: SkillsService;
  const repo = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByName: jest.fn(),
    createSkill: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillsService, { provide: SkillsRepository, useValue: repo }],
    }).compile();

    service = module.get<SkillsService>(SkillsService);
    jest.clearAllMocks();
  });

  it('should create a skill', async () => {
    const skill = {
      id: 1,
      name: 'NestJS',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Skill;
    repo.findByName.mockResolvedValue(null);
    repo.createSkill.mockResolvedValue(skill);

    const result = await service.create({ name: 'NestJS' });
    expect(result).toBe(skill);
    expect(repo.createSkill).toHaveBeenCalled();
  });

  it('should throw error if name exists on create', async () => {
    repo.findByName.mockResolvedValue({ id: 1 } as Skill);
    await expect(service.create({ name: 'NestJS' })).rejects.toBeInstanceOf(
      HttpException,
    );
  });

  it('should update a skill', async () => {
    const skill = { id: 1, name: 'Old', category: undefined } as Skill;
    repo.findById.mockResolvedValue(skill);
    repo.findByName.mockResolvedValue(null);
    repo.save.mockImplementation(async (s) => s);

    const result = await service.update(1, { name: 'New' });
    expect(result.name).toBe('New');
    expect(repo.save).toHaveBeenCalled();
  });

  it('should throw 404 when deleting missing skill', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(service.remove(1)).rejects.toBeInstanceOf(HttpException);
  });
});
