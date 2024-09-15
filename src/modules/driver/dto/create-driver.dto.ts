import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  license: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsEnum(['A', 'B', 'C1', 'D1', 'D'])
  typeLicense: 'A' | 'B' | 'C' | 'C1' | 'D1' | 'D';

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}
