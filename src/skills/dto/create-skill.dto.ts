import { IsOptional, IsString, Length } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  category?: string;
}
