import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {

  getAllMovies(): string {
    return 'Todos os filmes';
  }

  getOneMovie(): string {
    return 'Apenas um filme'
  }

  createMovie(): string {
    return 'Cria um filme'
  }

  updateMovie(): string {
    return 'Atualiza um filme'
  }

  deleteMovie(): string {
    return 'Deleta um filme'
  }



}
