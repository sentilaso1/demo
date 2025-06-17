import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create-skill.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  category?: string;
}
