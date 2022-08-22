import { Controller,Post,Body } from '@nestjs/common';
import { ApiTags,ApiOperation,ApiResponse } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly movieService: UserService) {}
  
  @Post()
  @ApiOperation({summary:'"Cadastra" um usuário'})
  @ApiResponse({status:200,description:'Usuário criado com sucesso'})
  @ApiResponse({status:400,description:'Parâmetros inválidos'})
  async create(@Body() body: CreateUserDto){
      return await this.movieService.createUser(body);
  }

}
