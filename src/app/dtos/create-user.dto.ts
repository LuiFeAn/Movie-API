import { IsNotEmpty,IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @IsNotEmpty()
    @ApiProperty()
    username:string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email:string;

    @IsNotEmpty()
    @ApiProperty()
    password:string

}