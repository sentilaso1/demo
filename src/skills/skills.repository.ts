import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';

export interface ISkillsRepository {
  findAll(): Promise<Skill[]>;
  findById(id: number): Promise<Skill | null>;
  findByName(name: string): Promise<Skill | null>;
  createSkill(skill: Partial<Skill>): Promise<Skill>;
  save(skill: Skill): Promise<Skill>;
  remove(id: number): Promise<void>;
}

@Injectable()
export class SkillsRepository implements ISkillsRepository {
  constructor(
    @InjectRepository(Skill)
    private readonly repo: Repository<Skill>,
  ) {}

  findAll(): Promise<Skill[]> {
    return this.repo.find();
  }

  findById(id: number): Promise<Skill | null> {
    return this.repo.findOne({ where: { id } });
  }

  findByName(name: string): Promise<Skill | null> {
    return this.repo.findOne({ where: { name } });
  }

  async createSkill(skill: Partial<Skill>): Promise<Skill> {
    const entity = this.repo.create(skill);
    return this.repo.save(entity);
  }

  save(skill: Skill): Promise<Skill> {
    return this.repo.save(skill);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
