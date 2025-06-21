import { Module } from '@nestjs/common';

import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';



@Module({
  imports: [AuthModule, UsersModule, MailerModule],
  controllers: [ AuthController, UsersController],
  providers: [ AuthService, UsersService, PrismaService,JwtService],
})
export class AppModule {}
