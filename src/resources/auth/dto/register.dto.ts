import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    username: string;
}
