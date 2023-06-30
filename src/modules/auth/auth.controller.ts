import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('ping')
  Ping(@Body() dto: AuthDto) {
    console.log('ping');
    return 'pongs';
  }
  @Post('signin')
  SignIn(@Body() dto: AuthDto) {
    return this.authService.SignIn(dto);
  }
  @Post('signup-patient')
  signUpPatient() {
    console.log('signup-patient');
  }
  @Post('signup-doctor')
  signUpDoctor(@Body() dto: AuthDto) {
    return this.authService.signUpDoctor(dto);
  }
}
