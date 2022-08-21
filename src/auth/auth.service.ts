import { Injectable } from '@nestjs/common';
import { UserService } from 'src/app/services/user.service';
import {compareSync} from 'bcrypt';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

    constructor(private readonly userRepository: UserService, private readonly jwtRepository: JwtService){}

    async login(user){

        const payload = {
            Id:user.id,
            email:user.email
        }

        return {
            token: this.jwtRepository.sign(payload),
        }

    }

    async validateUser(email:string,password:string){

        let user:any
        user = await this.userRepository.findUser(email);
        if(user.length <= 0) return null
        const validPassword = compareSync(password,user[0].password);
        if(!validPassword) return null;

        return user;
    }
}
