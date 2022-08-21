import { Controller,Post,Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly movieService: UserService) {}
  
  @Post()
  async create(@Body() body: CreateUserDto){
      return await this.movieService.createUser(body);
  }

}
