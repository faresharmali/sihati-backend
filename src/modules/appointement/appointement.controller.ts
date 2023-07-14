import { Controller, Get, Req, UseGuards, Param } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/guards/jwt.guard';
import { AppointementService } from './appointement.service';
@Controller('users')
export class AppointementController {
  constructor(private appointementService: AppointementService) {}
  @UseGuards(JwtGuard)
  @Get('/me')
  async getCurrentUser(@Req() req: Request) {
    console.log('get current user');
  }
}
