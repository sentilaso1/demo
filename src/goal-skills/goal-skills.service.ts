import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGoalSkillDto } from './dto/create-goal-skill.dto';
import { GoalSkillsRepository } from './goal-skills.repository';
import { GoalSkill } from './entities/goal-skill.entity';

@Injectable()
export class GoalSkillsService {
  constructor(private readonly repo: GoalSkillsRepository) {}

  async addSkill(goalId: number, dto: CreateGoalSkillDto): Promise<GoalSkill> {
    const existing = await this.repo.findByGoalAndSkill(goalId, dto.skillId);
    if (existing) {
      throw new HttpException('Skill already added', HttpStatus.BAD_REQUEST);
    }
    return this.repo.createGoalSkill({ goalId, ...dto });
  }

  listByGoal(goalId: number): Promise<GoalSkill[]> {
    return this.repo.findByGoal(goalId);
  }

  async removeSkill(goalId: number, skillId: number): Promise<void> {
    const existing = await this.repo.findByGoalAndSkill(goalId, skillId);
    if (!existing) {
      throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
    }
    await this.repo.remove(goalId, skillId);
  }
}
