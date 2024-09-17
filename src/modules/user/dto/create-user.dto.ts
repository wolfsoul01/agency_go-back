import { Prisma } from '@prisma/client';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsEmail()
  email: string;

  @Length(6)
  @IsString()
  password: string;

  @IsString()
  name: string;
}
