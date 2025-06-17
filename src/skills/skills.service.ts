import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { SkillsRepository } from './skills.repository';

@Injectable()
export class SkillsService {
  constructor(private readonly repo: SkillsRepository) {}

  async create(dto: CreateSkillDto): Promise<Skill> {
    const existing = await this.repo.findByName(dto.name);
    if (existing) {
      throw new HttpException(
        'Skill name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.repo.createSkill(dto);
  }

  findAll(): Promise<Skill[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<Skill> {
    const skill = await this.repo.findById(id);
    if (!skill) {
      throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
    }
    return skill;
  }

  async update(id: number, dto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.repo.findById(id);
    if (!skill) {
      throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
    }
    if (dto.name) {
      const dup = await this.repo.findByName(dto.name);
      if (dup && dup.id !== id) {
        throw new HttpException(
          'Skill name already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    Object.assign(skill, dto);
    return this.repo.save(skill);
  }

  async remove(id: number): Promise<void> {
    const skill = await this.repo.findById(id);
    if (!skill) {
      throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
    }
    await this.repo.remove(id);
  }
}
