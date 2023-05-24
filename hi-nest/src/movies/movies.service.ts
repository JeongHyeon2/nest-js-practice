import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[]{
        return this.movies;
    }
    getOne(id: string): Movie{
        const movie = this.movies.find(movie => movie.id == +id);
        if (!movie) { 
            throw new NotFoundException(`Moive with Id ${id} not found`);
        }
        return movie;

    }
    deleteOne(id: string): boolean{
        //for error check
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== +id);
        return true;
    }
    create(movieData : CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        })
    }
    update(id: string, updateData:UpdateMovieDto) {
        const moive = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...moive, ...updateData,"title":"test" });
        console.log(moive);
        console.log(updateData);


    }
}
