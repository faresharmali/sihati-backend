import {
  Controller,
  Get,
  Req,
  Body,
  UseGuards,
  Post,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../../guards/jwt.guard';
import { AppointementService } from './appointement.service';
import { AppointementDto } from './appointement.dto';
import { UserPayload } from '../../types';
@Controller('appointement')
export class AppointementController {
  constructor(private appointementService: AppointementService) {}
  @UseGuards(JwtGuard)
  @Get('/doctor/:id')
  async getDoctorAppointements(@Param() param: { id: string }) {
    return await this.appointementService.getDoctorAppointement(param.id);
  }
  @Get('/doctor/free/:id/:date')
  async getDoctorFeeTime(@Param() param: { id: string; date: string }) {
    return await this.appointementService.getDoctorFreeAppointements(
      param.id,
      param.date,
    );
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  async createAppointement(@Body() dto: AppointementDto) {
    return this.appointementService.createAppointement(dto);
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  async getMyAppointement(@Req() req: Request) {
    return await this.appointementService.getMyAppointements(
      req.user as UserPayload,
    );
  }
}
