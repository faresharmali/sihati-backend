import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { userDto, DoctorDto, LoginDto } from './auth.dto';
import * as argon from 'argon2';
import { UserRole } from 'src/types';
import { TokenService } from 'src/providers/tokens/token.service';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}

  // login
  async SignIn(body: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!user) {
        throw new ForbiddenException('User not found');
      }
      const passwordMatch = await argon.verify(user.password, body.password);
      if (!passwordMatch) {
        throw new ForbiddenException('Wrong password');
      }
      return {
        accessToken: await this.tokenService.signToken(
          user.identifier,
          user.role,
        ),
      };
    } catch (error) {
      throw error;
    }
  }

  // Register doctors

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

  // Register patients

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

  async signOut() {
    return 'signOut';
  }
}
