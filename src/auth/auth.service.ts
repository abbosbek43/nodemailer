import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from './dto/register.dto';
import * as bcrypt from "bcrypt";
import { TokenService } from './jwt.service';
import { MaileService } from '../modules/mailer/mailer.service'; 

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private tokenService: TokenService,
        private maileService: MaileService 
    ) {}
    
    async register(data: CreateUserDto) {
        const existsUser = await this.prisma.user.findFirst({
            where: { username: data.username }
        });
        
        if (existsUser) throw new ConflictException("user already exists");
        
        const hashed = await bcrypt.hash(data.password, 10);
        console.log(hashed);
        
        const result = await this.prisma.user.create({
            data: { ...data, password: hashed }
        });
        
        const access_token = this.tokenService.generateToken({
            id: result.id,
            email: result.email,
            roles: result.roles
        });
        
       
         const verificationCode = Math.floor(100000 + Math.random() * 900000);
         await this.maileService.sendTextEmail(
             result.email,
             'Ro\'yxatdan o\'tganingiz uchun rahmat!',
            verificationCode
         );
        
        return {
            access_token,  
            result
        };
    }
    
    async login(data: LoginUserDto) {
        const existsuser = await this.prisma.user.findFirst({
            where: { username: data.username }
        });
        
        if (!existsuser) throw new NotFoundException("user not found");
        
        const decode = await bcrypt.compare(data.password, existsuser.password);
        if (!decode) throw new NotFoundException("invalid login or password");
        
        const access_token = await this.tokenService.generateToken({
            id: existsuser.id,
            email: existsuser.email,
            roles: existsuser.roles
        });
        
        return {
            message: "successfully signedIn",  
            access_token 
        };
    }
}