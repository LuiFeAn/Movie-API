import { Injectable, NotFoundException, ParseUUIDPipe, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entitys/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {

  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}

  async createUser(data:CreateUserDto){
      const user = await this.userRepository.findOneBy({email:data.email});
      if(user) throw new UnauthorizedException({
        msg:'Este email já se encontra em uso !'
      });
      return await this.userRepository.save(this.userRepository.create(data));
  }

  async findUser(email:string){
      return await this.userRepository.findBy({email});
  }

}
