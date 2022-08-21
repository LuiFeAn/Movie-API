import { Controller, Get,Post,Put,Delete } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class AppController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  index(): string {
    return this.movieService.getAllMovies();
  }

  @Get(':id')
  show(): string {
    return this.movieService.getOneMovie();
  }

  @Post()
  create(): string {
    return this.movieService.createMovie();
  }

  @Put(':id')
  update(): string {
    return this.movieService.updateMovie();
  }

  @Delete(':id')
  delete(): string {
    return this.movieService.deleteMovie();
  }

}
