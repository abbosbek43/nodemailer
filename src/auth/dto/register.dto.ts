import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

 
export class CreateUserDto{
    @IsNotEmpty()
    username:string
    @IsEmail()
    email:string
    @MinLength(4)
    @MaxLength(16)
    password:string
}
export class LoginUserDto{
    @IsNotEmpty()
    username:string
    @MinLength(4)
    @MaxLength(16)
    password:string
}