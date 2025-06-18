import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoalSkill } from './entities/goal-skill.entity';

export interface IGoalSkillsRepository {
  findByGoalAndSkill(
    goalId: number,
    skillId: number,
  ): Promise<GoalSkill | null>;
  createGoalSkill(data: Partial<GoalSkill>): Promise<GoalSkill>;
  findByGoal(goalId: number): Promise<GoalSkill[]>;
  remove(goalId: number, skillId: number): Promise<void>;
}

@Injectable()
export class GoalSkillsRepository implements IGoalSkillsRepository {
  constructor(
    @InjectRepository(GoalSkill)
    private readonly repo: Repository<GoalSkill>,
  ) {}

  findByGoalAndSkill(
    goalId: number,
    skillId: number,
  ): Promise<GoalSkill | null> {
    return this.repo.findOne({ where: { goalId, skillId } });
  }

  async createGoalSkill(data: Partial<GoalSkill>): Promise<GoalSkill> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  findByGoal(goalId: number): Promise<GoalSkill[]> {
    return this.repo.find({ where: { goalId } });
  }

  async remove(goalId: number, skillId: number): Promise<void> {
    await this.repo.delete({ goalId, skillId });
  }
}
