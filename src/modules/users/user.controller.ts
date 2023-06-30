import { Controller, Get, Req, UseGuards, Param } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { JwtGuard } from 'src/guards/jwt.guard';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtGuard)
  @Get('/me')
  async getCurrentUser(@Req() req: Request) {
    this.userService.getCurrentUser(req.user);
    return 'me';
  }
  @UseGuards(JwtGuard)
  @Get('/doctors')
  async getDoctors() {
    return await this.userService.getDoctors();
  }

  @UseGuards(JwtGuard)
  @Get('/doctors/:id')
  async getDoctorById(@Param('id') id: string) {
    return await this.userService.getDoctorById(id);
  }
}
