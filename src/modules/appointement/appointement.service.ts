import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Appointement, UserPayload, UserRole } from '../../types';
import { DoctorSelectingCriteria } from '../../constants';
import { AppointementDto } from './appointement.dto';
@Injectable()
export class AppointementService {
  constructor(private prisma: PrismaService) {}

  timeSlots() {
    const slots: any = [];
    const start = 8;
    const end = 16;
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
    console.log('getDoctorAppointement', id);
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

  async getDoctorFreeAppointements(id: string, date: string) {
    try {
      const appointements = await this.prisma.appointement.findMany({
        where: {
          date: date,
          doctorId: id,
        },
      });

      if (!appointements.length) return this.times;
      const freeAppointements = this.times.filter(
        (item, index) => !appointements.map((a) => a.timeIndex).includes(index),
      );
      console.log(
        'freeAppointements',
        appointements.map((a) => a.timeIndex),
      );
      console.log('freeAppointements', freeAppointements);
      return freeAppointements;
    } catch (error) {
      throw error;
    }
  }
}
