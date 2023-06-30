import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class userDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class DoctorDto extends userDto {
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  specialization: string;
}
