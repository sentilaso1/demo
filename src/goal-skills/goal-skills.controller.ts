import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GoalSkillsService } from './goal-skills.service';
import { CreateGoalSkillDto } from './dto/create-goal-skill.dto';
import { GoalSkill } from './entities/goal-skill.entity';

@Controller('goals/:goalId/skills')
export class GoalSkillsController {
  constructor(private readonly service: GoalSkillsService) {}

  @Post()
  add(
    @Param('goalId') goalId: string,
    @Body() dto: CreateGoalSkillDto,
  ): Promise<GoalSkill> {
    return this.service.addSkill(Number(goalId), dto);
  }

  @Get()
  list(@Param('goalId') goalId: string): Promise<GoalSkill[]> {
    return this.service.listByGoal(Number(goalId));
  }

  @Delete(':skillId')
  remove(
    @Param('goalId') goalId: string,
    @Param('skillId') skillId: string,
  ): Promise<void> {
    return this.service.removeSkill(Number(goalId), Number(skillId));
  }
}
