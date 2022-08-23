import { Controller, Get,Post,Put,Delete, Body, ParseUUIDPipe, Param, HttpCode, HttpStatus,NotFoundException,UseGuards, BadRequestException } from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { ApiTags,ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';
import { AuthGuard } from '@nestjs/passport'
import { CacheKey } from '@nestjs/common';

@Controller('movies')
@ApiTags('Movies')
@UseGuards(AuthGuard('jwt'))
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @CacheKey('movies')
  @ApiOperation({summary:'Obtém o registro de todos os filmes'})
  @ApiResponse({status:401,description:'Não possui autorização para obter todos os filmes'})
  @ApiResponse({status:200,description:'Obteve todos os filmes com sucesso'})
  async index() {
    return await this.movieService.getAllMovies();
  }

  @Get(':id')
  @CacheKey('movies')
  @ApiOperation({summary:'Obtém o registro de um único filme através do UUID'})
  @ApiResponse({status:401,description:'Não possui autorização para obter um filme'})
  @ApiResponse({status:200,description:'Obteve um filme com sucesso'})
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.movieService.getMovie(id);
  }

  @Post()
  @ApiOperation({summary:'Cria o registro de um filme através do UUID'})
  @ApiResponse({status:401,description:'Não possui autorização para criar um novo filme'})
  @ApiResponse({status:200,description:'Criou um novo filme com sucesso'})
  @ApiResponse({status:400,description:'Parâmetros inválidos'})
  async create(@Body() body: CreateMovieDto) {
    return await this.movieService.createMovie(body);
  }

  @Put(':id')
  @ApiOperation({summary:'Atualiza o registro de um filme através do UUID'})
  @ApiResponse({status:401,description:'Não possui autorização para atualizar um filme'})
  @ApiResponse({status:200,description:'Atualizou um filme com sucesso'})
  @ApiResponse({status:400,description:'Parâmetros inválidos'})
  async update(@Param('id', new ParseUUIDPipe()) id: string,@Body() body: UpdateMovieDto) {
    const atLeastOne = Object.values(body);
    //Tentei criar um erro personalizado, pois não encontrei nenhuma forma de validar isto através do class-validator.
    if(atLeastOne.length <= 0) throw new BadRequestException({
      error:'Necessário informar ao menos uma propriedade'
    });
    return await this.movieService.updateMovie(id,body);
  }

  @Delete(':id')
  @ApiOperation({summary:'Deleta o registro de um filme através do UUID'})
  @ApiResponse({status:401,description:'Não possui autorização para deletar um filme'})
  @ApiResponse({status:200,description:'Deletou um filme com sucesso'})
  @ApiResponse({status:400,description:'Parâmetros inválidos'})
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.movieService.deleteMovie(id)
  }

}
