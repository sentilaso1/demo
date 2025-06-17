import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { Skill } from './entities/skill.entity';
import { SkillsRepository } from './skills.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  controllers: [SkillsController],
  providers: [SkillsService, SkillsRepository],
})
export class SkillsModule {}
