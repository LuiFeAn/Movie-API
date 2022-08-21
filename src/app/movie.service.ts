import { Injectable, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entity/movie.entity';

@Injectable()
export class MovieService {

  constructor(@InjectRepository(MovieEntity) private readonly movieRepository: Repository<MovieEntity>){}

  async getAllMovies(){
    return await this.movieRepository.find();
  }

  async getMovie(id:string){
    
    try{
        return await this.movieRepository.findOneByOrFail({id})
    }catch(err){
        throw new NotFoundException(err.message);
    }

  }

  async createMovie(data:MovieEntity){
    return await this.movieRepository.save(this.movieRepository.create(data));
  }

  async updateMovie(id:string,data:MovieEntity){
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
