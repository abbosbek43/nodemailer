

import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post("register")
    create(@Body() data: CreateUserDto) {
        return this.authService.register(data);
    }
    
    @Post("login")
    login(@Body() data: LoginUserDto) {
        return this.authService.login(data);
    }
}
