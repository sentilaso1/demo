import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Goal } from '../../goals/entities/goal.entity';
import { Skill } from '../../skills/entities/skill.entity';

export enum StartLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

@Entity('goal_skills')
export class GoalSkill {
  @PrimaryColumn()
  goalId: number;

  @PrimaryColumn()
  skillId: number;

  @ManyToOne(() => Goal, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'goalId' })
  goal: Goal;

  @ManyToOne(() => Skill, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skillId' })
  skill: Skill;

  @Column({ default: 0 })
  priority: number;

  @Column({ type: 'enum', enum: StartLevel })
  startLevel: StartLevel;

  @CreateDateColumn()
  createdAt: Date;
}
