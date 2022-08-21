import { Injectable, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {

  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}

  async createUser(data:CreateUserDto){
      const user = await this.userRepository.findOneBy({email:data.email});
      return await this.userRepository.save(this.userRepository.create(data));
  }

}
