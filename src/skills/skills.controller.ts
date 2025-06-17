import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillsService } from './skills.service';
import { Skill } from './entities/skill.entity';

@Controller('skills')
export class SkillsController {
  constructor(private readonly service: SkillsService) {}

  @Get()
  findAll(): Promise<Skill[]> {
    return this.service.findAll();
  }

  @Post()
  create(@Body() dto: CreateSkillDto): Promise<Skill> {
    return this.service.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Skill> {
    return this.service.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSkillDto): Promise<Skill> {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(Number(id));
  }
}
