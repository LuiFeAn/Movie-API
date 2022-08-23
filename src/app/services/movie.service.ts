import { CACHE_MANAGER, Inject, Injectable, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from '../entitys/movie.entity';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class MovieService {

  constructor(@InjectRepository(MovieEntity) private readonly movieRepository: Repository<MovieEntity>,@Inject(CACHE_MANAGER) private readonly cachedManager:Cache){}

  async getAllMovies(){
    await this.cachedManager.set('all_movies',await this.movieRepository.find());
    return await this.cachedManager.get('all_movies')
  }

  async getMovie(id:string){
    
    try{
        await this.cachedManager.set('movie',await this.movieRepository.findOneByOrFail({id}));
        return await this.cachedManager.get('movie');
    }catch(err){
        throw new NotFoundException(err.message);
    }

  }

  async createMovie(data:CreateMovieDto){
    return await this.movieRepository.save(this.movieRepository.create(data));
  }

  async updateMovie(id:string,data:UpdateMovieDto){
    const movie = await this.movieRepository.findOneBy({id});
    await this.movieRepository.update(movie,data);
    return data;
  }

  async deleteMovie(id:string){
    
    try{
      await this.movieRepository.findOneByOrFail({id})
      await this.movieRepository.delete({id});
    }catch(err){
        throw new NotFoundException(err.message);
    }
  }

}
