import { Controller, Get,Post,Put,Delete, Body, ParseUUIDPipe, Param, HttpCode, HttpStatus,ValidationError, NotFoundException,UseGuards } from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { AuthGuard } from '@nestjs/passport'

@Controller('movies')
@UseGuards(AuthGuard('jwt'))
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async index() {
    return await this.movieService.getAllMovies();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.movieService.getMovie(id);
  }

  @Post()
  async create(@Body() body: CreateMovieDto) {
    return await this.movieService.createMovie(body);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string,@Body() body: UpdateMovieDto) {
    const atLeastOne = Object.values(body);
    //Tentei criar um erro personalizado, pois não encontrei nenhuma forma de validar isto através do class-validator.
    if(atLeastOne.length <= 0) throw new NotFoundException({
      error:'Necessário informar ao menos uma propriedade'
    });
    return await this.movieService.updateMovie(id,body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.movieService.deleteMovie(id)
  }

}
