import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TokenModule } from './providers/tokens/token.module';
import { UserModule } from './modules/users/user.module';
import { AppointementModule } from './modules/appointement/appointement.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    PrismaModule,
    TokenModule,
    UserModule,
    AppointementModule,
  ],
})
export class AppModule {}
