import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @Length(1, 255)
  email: string;

  @Length(6, 255)
  password: string;
}
