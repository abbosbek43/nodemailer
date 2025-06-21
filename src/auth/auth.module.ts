import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from './jwt.service';
import { MaileModule } from '../modules//mailer/mailer.module'; 

@Module({
    imports: [
        JwtModule.register({
            secret: "jwtsecretkey",
            signOptions: { expiresIn: "1h" }
        }),
        MaileModule 
    ],
    providers: [AuthService, PrismaService, TokenService],
    controllers: [AuthController],
    exports: [TokenService,MaileModule]
})
export class AuthModule {}
