import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Appointement, UserPayload, UserRole } from 'src/types';
import { DoctorSelectingCriteria } from 'src/constants';
import { AppointementDto } from './appointement.dto';
@Injectable()
export class AppointementService {
  constructor(private prisma: PrismaService) {}

  timeSlots() {
    let slots: any = [];
    let start = 8;
    let end = 16;
    for (let i = start; i < end; i++) {
      slots.push(`${i}:00 - ${i}:30`);
      slots.push(`${i}:30 - ${i + 1}:00`);
    }
    return slots;
  }
  times = this.timeSlots();
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
  async getDoctorAppointement(id: string) {
    try {
      const appointements = await this.prisma.appointement.findMany({
        where: {
          doctorId: id,
        },
        include: {
          patient: true,
        },
      });
      return appointements;
    } catch (error) {
      throw error;
    }
  }
  async createAppointement(appointement: AppointementDto) {
    try {
      const appointementData = await this.prisma.appointement.create({
        data: {
          doctorId: appointement.doctorId,
          patientId: appointement.patientId,
          date: appointement.date,
          timeIndex: appointement.timeIndex,
        },
      });
      console.log('appointementData', appointementData);
      return appointementData;
    } catch (error) {
      throw error;
    }
  }

  async getMyAppointements(user: UserPayload) {
    try {
      const appointements = await this.prisma.appointement.findMany({
        where: {
          patientId: user.id,
        },
        include: {
          doctor: true,
        },
      });
      return appointements;
    } catch (error) {
      throw error;
    }
  }
}
