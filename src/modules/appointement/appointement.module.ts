import { Module } from '@nestjs/common';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { AppointementService } from './appointement.service';
import { AppointementController } from './appointement.controller';

@Module({
  controllers: [AppointementController],
  providers: [AppointementService, JwtStrategy, PrismaService],
})
export class AppointementModule {}
