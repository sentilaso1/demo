import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Goal } from './entities/goal.entity';
import { GoalsRepository } from './goals.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class GoalsService {
  constructor(
    private readonly repo: GoalsRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(dto: CreateGoalDto): Promise<Goal> {
    const user = await this.usersService.findOne(dto.userId).catch(() => null);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.repo.createGoal(dto);
  }

  findAll(): Promise<Goal[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<Goal> {
    const goal = await this.repo.findById(id);
    if (!goal) {
      throw new HttpException('Goal not found', HttpStatus.NOT_FOUND);
    }
    return goal;
  }

  async update(id: number, dto: UpdateGoalDto): Promise<Goal> {
    const goal = await this.findOne(id);
    Object.assign(goal, dto);
    return this.repo.save(goal);
  }

  async remove(id: number): Promise<void> {
    const goal = await this.repo.findById(id);
    if (!goal) {
      throw new HttpException('Goal not found', HttpStatus.NOT_FOUND);
    }
    await this.repo.remove(id);
  }
}
