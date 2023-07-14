import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DoctorDto, LoginDto, userDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('ping')
  Ping(@Body() dto: userDto) {
    console.log('ping');
    return 'pongs';
  }
  @Post('signin')
  SignIn(@Body() dto: LoginDto) {
    return this.authService.SignIn(dto);
  }
  @Post('signup-patient')
  signUpPatient(@Body() dto: userDto) {
    return this.authService.signUpPatient(dto);
  }
  @Post('signup-doctor')
  signUpDoctor(@Body() dto: DoctorDto) {
    return this.authService.signUpDoctor(dto);
  }
}
