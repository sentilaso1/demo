import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalSkillsController } from './goal-skills.controller';
import { GoalSkillsService } from './goal-skills.service';
import { GoalSkillsRepository } from './goal-skills.repository';
import { GoalSkill } from './entities/goal-skill.entity';
import { Goal } from '../goals/entities/goal.entity';
import { Skill } from '../skills/entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoalSkill, Goal, Skill])],
  controllers: [GoalSkillsController],
  providers: [GoalSkillsService, GoalSkillsRepository],
})
export class GoalSkillsModule {}
