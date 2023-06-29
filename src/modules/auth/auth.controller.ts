import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signin')
  SignIn() {
    return this.authService.SignIn();
  }
  @Post('signup-patient')
  signUpPatient() {
    console.log('signup-patient');
  }
  @Post('signup-doctor')
  signUpDoctor(@Req() req: Request) {
    return this.authService.signUpDoctor(req.body);
  }
}
