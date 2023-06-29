import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  SignIn() {
    return { msg: 'sognin' };
  }
  async signOut() {
    return 'signOut';
  }
  signUpDoctor(body) {
    console.log('request body', body);
    return 'signUp Doctor';
  }
  signUpPatient() {
    return 'signUp Patient';
  }
}
