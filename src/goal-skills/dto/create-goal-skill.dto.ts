import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { StartLevel } from '../entities/goal-skill.entity';

export class CreateGoalSkillDto {
  @IsInt()
  skillId: number;

  @IsOptional()
  @IsInt()
  priority?: number;

  @IsEnum(StartLevel)
  startLevel: StartLevel;
}
