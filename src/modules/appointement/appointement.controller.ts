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
import { JwtGuard } from 'src/guards/jwt.guard';
import { AppointementService } from './appointement.service';
import { AppointementDto } from './appointement.dto';
import { UserPayload } from 'src/types';
@Controller('appointement')
export class AppointementController {
  constructor(private appointementService: AppointementService) {}
  @UseGuards(JwtGuard)
  @Get('/doctor/:id')
  async getCurrentUser(@Param() param: { id: string }) {
    return await this.appointementService.getDoctorAppointement(param.id);
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
