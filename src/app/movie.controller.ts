import { Controller, Get,Post,Put,Delete, Body, ParseUUIDPipe, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
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
  async create(@Body() body) {
    return await this.movieService.createMovie(body);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string,@Body() body) {
    return await this.movieService.updateMovie(id,body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.movieService.deleteMovie(id)
  }

}
