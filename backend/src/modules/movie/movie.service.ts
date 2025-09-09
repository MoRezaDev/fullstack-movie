import { HttpException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { DatabaseService } from '../database/database.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import Together from 'together-ai';
import { SavePoster } from 'src/common/helper/functions';

@Injectable()
export class MovieService {
  constructor(
    private databaseService: DatabaseService,
    private configService: ConfigService,
  ) {}
  async create(createMovieDto: CreateMovieDto) {
    return await this.databaseService.movie.create({
      data: createMovieDto,
    });
  }

  async findAll() {
    return await this.databaseService.movie.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    console.log('trig');
    return await this.checkMovieExists(id);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findById(id);

    return await this.databaseService.movie.update({
      where: { imdb_id: movie.imdb_id },
      data: { ...updateMovieDto },
    });
  }

  async updateAll(updateDto: UpdateMovieDto) {
    return await this.databaseService.movie.updateMany({ data: updateDto });
  }

  async remove(id: string) {
    try {
      return await this.databaseService.movie.delete({
        where: { imdb_id: id },
      });
    } catch (err) {
      throw new HttpException('آیدی در دیتابیس یافت نشد', 404);
    }
  }

  async removeAll() {
    return this.databaseService.movie.deleteMany();
  }

  //for admin features
  async findById(imdb_id: string) {
    const movie = await this.databaseService.movie.findUnique({
      where: { imdb_id },
    });
    if (!imdb_id || !movie)
      throw new HttpException('movie not found with this Id', 404);
    return movie;
  }

  async addOrFindMovie(imdb_id: string) {
    const foundedMovie = await this.databaseService.movie.findUnique({
      where: { imdb_id },
    });
    if (foundedMovie) {
      return foundedMovie;
    }

    const { data } = await axios.get(
      `${process.env.MOVIE_BASE_URL}i=${imdb_id}&plot=full` || '',
    );

    const { data: backgroundData } = await axios.get(
      `https://api.themoviedb.org/3/find/${imdb_id}?external_source=imdb_id`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      },
    );

    if (typeof data === 'string' || data.Error) {
      throw new HttpException(data.Error ?? 'Movie not found', 404);
    }

    const [poster, backgroundPoster] = await SavePoster(
      data.Poster,
      imdb_id,
      'movie',
      `https://image.tmdb.org/t/p/w1280/${backgroundData.movie_results[0].backdrop_path}`,
    );

    //create translator
    const translatedDescription = await this.translateMovieDescription(
      data.Plot,
    );

    const movie = await this.databaseService.movie.create({
      data: {
        title: data.Title,
        description: translatedDescription ?? data.Plot,
        imdb_id: data.imdbID,
        duration: data.Runtime,
        poster,
        images_url: [backgroundPoster],
        genre: data.Genre.split(', '),
        year: +data.Year,
        rating: data.imdbRating,
        rating_search: +data.imdbRating && data.imdbRating.toLowerCase() !== 'n/a' ? Number(data.imdbRating)  : 0,
        director: data.Director,
        stars: data.Actors.split(', '),
        language: data.Language.split(', '),
      },
    });

    return movie;
  }

  async translateMovieDescription(description: string) {
    // const openai = new OpenAI({
    //   baseURL: 'https://api.aimlapi.com/v1',
    //   apiKey: `${process.env.ML_API_KEY}`,
    // });

    const together = new Together();
    try {
      const response = await together.chat.completions.create({
        model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        messages: [
          {
            role: 'user',
            content: `this is the decription text for the movie,without any external answers like Here are a few Persian translations, with slightly different nuances, to capture the meaning of the description text:\n\n**Option 1 (More Literal) or something else...please translate this text to persian: ${description}. and please in response just show me the translated text without any other text or answers**`,
          },
        ],
      });

      return response.choices[0].message?.content;
    } catch (err) {}
  }

  //helper functions
  async checkMovieExists(imdb_id: string) {
    const regex = /^tt.+$/;
    if (!imdb_id || !regex.test(imdb_id))
      throw new HttpException('فرمت آیدی شتباه است', 403);

    const foundedMovie = await this.databaseService.movie.findUnique({
      where: { imdb_id },
    });
    if (!foundedMovie) throw new HttpException('آیدی در سایت موجود نیست', 404);
    return foundedMovie;
  }
}
