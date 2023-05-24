import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly movieService:MoviesService){}
    @Get()
    getAll():Movie[] {
        return this.movieService.getAll();
    }
    //search가 get보다 밑에 있으면 get으로 인식한다.
    // url localhost:3000/movies/search?year=2000 
    @Get("search")
    search(@Query("year") searchingYear:string) {
        return `We are searching for a movie made after: ${searchingYear}`
    }

    // id 입력을 요청하고 싶다면 아래처럼 작성
    @Get("/:id")
    getOne(@Param("id") movieId: string): Movie {
        return this.movieService.getOne(movieId);
    }

    //request의 body를 가져오기 위한 데코레이터
    @Post()
    create(@Body() movieData : CreateMovieDto) {
        return this.movieService.create(movieData);
    }
    @Delete("/:id")
    remove(@Param("id") movieId:string) {
        return this.movieService.deleteOne(movieId);
    }

    @Patch("/:id")
    patch(@Param("id") movieId: string, @Body() updateData : UpdateMovieDto) {
        return this.movieService.update(movieId, updateData);
    }

 
}
