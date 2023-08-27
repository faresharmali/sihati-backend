import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { userDto, DoctorDto, LoginDto } from './auth.dto';
import * as argon from 'argon2';
import { UserRole } from '../../types';
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
        include: {
          Doctor: true,
        },
      });
      if (!user) {
        throw new ForbiddenException('User not found');
      }
      const passwordMatch = await argon.verify(user.password, body.password);
      if (!passwordMatch) {
        throw new ForbiddenException('Wrong password');
      }
      const data = { ...user };
      delete data.password;

      return {
        ...data,
        token: await this.tokenService.signToken(data.identifier, data.role),
      };
    } catch (error) {
      throw error;
    }
  }

  // Register doctors

  async signUpDoctor(body: DoctorDto) {
    console.log('sign up doctor', body);
    try {
      const userInDB = await this.prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (userInDB) {
        throw new ForbiddenException('Email already exists');
      }
      const hashedPassword = await argon.hash(body.password);
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
    console.log('sign up patient', body.name);
    try {
      const userInDB = await this.prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (userInDB) {
        throw new ForbiddenException('Email already exists');
      }
      const hashedPassword = await argon.hash(body.password);
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
