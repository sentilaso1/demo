import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { GoalsService } from './goals.service';
import { Goal } from './entities/goal.entity';

@Controller('goals')
export class GoalsController {
  constructor(private readonly service: GoalsService) {}

  @Post()
  create(@Body() dto: CreateGoalDto): Promise<Goal> {
    return this.service.create(dto);
  }

  @Get()
  findAll(): Promise<Goal[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Goal> {
    return this.service.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGoalDto): Promise<Goal> {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(Number(id));
  }
}
