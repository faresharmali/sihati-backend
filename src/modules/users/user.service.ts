import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserPayload, UserRole } from 'src/types';
import { DoctorSelectingCriteria } from 'src/constants';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getCurrentUser(user: UserPayload) {
    try {
      const currentUser = await this.prisma.user.findUnique({
        where: {
          identifier: user.id,
        },
      });
      delete currentUser.password;
      delete currentUser.id;
      return currentUser;
    } catch (error) {
      throw error;
    }
  }

  async getDoctors() {
    try {
      const doctors = await this.prisma.user.findMany({
        where: {
          role: UserRole.DOCTOR,
        },
        select: {
          ...DoctorSelectingCriteria,
        },
      });
      return doctors;
    } catch (error) {
      throw error;
    }
  }
  async getDoctorById(id: string) {
    try {
      const doctor = await this.prisma.user.findUnique({
        where: {
          identifier: id,
        },
        select: {
          ...DoctorSelectingCriteria,
        },
      });
      return doctor;
    } catch (error) {
      throw error;
    }
  }
}
