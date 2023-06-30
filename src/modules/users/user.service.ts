import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from 'src/types';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getCurrentUser(user) {
    try {
      const currentUser = await this.prisma.user.findUnique({
        where: {
          identifier: user.id,
        },
      });
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
          name: true,
          phone: true,
          identifier: true,
          createdAt: true,
          Doctor: {
            select: {
              specialization: true,
              address: true,
            },
          },
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
          name: true,
          phone: true,
          identifier: true,
          createdAt: true,
          Doctor: {
            select: {
              specialization: true,
              address: true,
            },
          },
        },
      });
      return doctor;
    } catch (error) {
      throw error;
    }
  }
}
