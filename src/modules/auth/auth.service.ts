import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { userDto, DoctorDto } from './auth.dto';
import * as argon from 'argon2';
import { ErrorHandler } from 'src/lib/errorHandler';
import { UserRole } from 'src/types';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  SignIn(body: userDto) {
    return { msg: 'hello' };
  }
  async signOut() {
    return 'signOut';
  }
  async signUpDoctor(body: DoctorDto) {
    const hashedPassword = await argon.hash(body.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
          role: UserRole.DOCTOR,
          phone: body.phone,
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
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email already exists');
      } else {
        throw error;
      }
    }
  }
  async signUpPatient(body: userDto) {
    const hashedPassword = await argon.hash(body.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
          role: UserRole.PATIENT,
          phone: body.phone,
          name: body.name,
        },
      });

      delete user.password;
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email already exists');
      } else {
        throw error;
      }
    }
  }
}
