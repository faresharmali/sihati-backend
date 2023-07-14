import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class AppointementDto {
  @IsNotEmpty()
  @IsString()
  doctorId: string;

  @IsNotEmpty()
  @IsString()
  patientId: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  timeIndex: number;
}
