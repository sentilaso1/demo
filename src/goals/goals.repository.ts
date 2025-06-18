import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from './entities/goal.entity';

export interface IGoalsRepository {
  findAll(): Promise<Goal[]>;
  findById(id: number): Promise<Goal | null>;
  createGoal(goal: Partial<Goal>): Promise<Goal>;
  save(goal: Goal): Promise<Goal>;
  remove(id: number): Promise<void>;
}

@Injectable()
export class GoalsRepository implements IGoalsRepository {
  constructor(
    @InjectRepository(Goal)
    private readonly repo: Repository<Goal>,
  ) {}

  findAll(): Promise<Goal[]> {
    return this.repo.find();
  }

  findById(id: number): Promise<Goal | null> {
    return this.repo.findOne({ where: { id } });
  }

  async createGoal(goal: Partial<Goal>): Promise<Goal> {
    const entity = this.repo.create(goal);
    return this.repo.save(entity);
  }

  save(goal: Goal): Promise<Goal> {
    return this.repo.save(goal);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
