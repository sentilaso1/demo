import {
  IsUUID,
  IsString,
  Length,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateGoalDto {
  @IsUUID()
  userId: string;

  @IsString()
  @Length(1, 255)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsString()
  successCriteria?: string;
}
