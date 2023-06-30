import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './auth.dto';
import * as argon from 'argon2';
import { ErrorHandler } from 'src/lib/errorHandler';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  SignIn(body: AuthDto) {
    return { msg: 'hello' };
  }
  async signOut() {
    return 'signOut';
  }
  async signUpDoctor(body: AuthDto) {
    const hashedPassword = await argon.hash(body.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
          role: 'DOCTOR',
          name: body.name,
        },
      });
      const doctor = await this.prisma.doctor.create({
        data: {
          userId: user.id,
          specialization: body.specialization,
          address: body.address,
        },
      });
      delete user.password;

      return { user, doctor };
    } catch (e) {
      return ErrorHandler(e.code);
    }
  }
  signUpPatient() {
    return 'signUp Patient';
  }
}
