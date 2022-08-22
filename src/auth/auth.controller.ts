import { Controller,Post,Req,UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport'
import { ApiTags,ApiOperation,ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Authorization')
export class AuthController {

    constructor(private readonly authRepository: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiOperation({summary:'Autentica o usuário para acessar as rotas privadas'})
    @ApiResponse({status:200,description:'Autenticado com sucesso'})
    @ApiResponse({status:401,description:'Email ou senha inválidos'})
    async authenticate(@Req() req: any){
        return await this.authRepository.login(req.user);
    }

}
