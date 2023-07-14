import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserPayload, UserRole } from 'src/types';
import { DoctorSelectingCriteria } from 'src/constants';
@Injectable()
export class AppointementService {
  constructor(private prisma: PrismaService) {}
  async getAppointement(user: UserPayload) {
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
}
