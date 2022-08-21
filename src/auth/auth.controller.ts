import { Controller,Post,Req,UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport'
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authRepository: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async authenticate(@Req() req: any){
        return await this.authRepository.login(req.user);
    }

}
