import { HttpException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { DatabaseService } from '../database/database.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fsSync from 'fs';

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
    return await this.databaseService.movie.findMany();
  }

  async findOne(id: string) {
    return await this.databaseService.movie.findUnique({ where: { id } });
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    return await this.databaseService.movie.update({
      where: { id },
      data: updateMovieDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.movie.delete({ where: { id } });
  }

  async removeAll() {
    return this.databaseService.movie.deleteMany();
  }

  //for admin features
  async findById(imdb_id: string) {
    return await this.databaseService.movie.findUnique({ where: { imdb_id } });
  }

  async addOrFindMovie(imdb_id: string) {
    const foundedMovie = await this.findById(imdb_id);
    if (foundedMovie) {
      return foundedMovie;
    }

    const { data } = await axios.get(
      `${process.env.MOVIE_BASE_URL}i=${imdb_id}` || '',
    );

    if (typeof data === 'string')
      throw new HttpException('Movie not found', 404);

    const staticPath = path.join(
      process.cwd(),
      'src',
      'public',
      'content',
      'movie',
      imdb_id,
    );
    const imagePath = path.join(staticPath, 'poster.jpg');
    fsSync.mkdirSync(staticPath, { recursive: true });
    const writer = fsSync.createWriteStream(imagePath);
    const response = await axios.get(data.Poster, { responseType: 'stream' });
    response.data.pipe(writer);

    // Wait for stream to finish
    await new Promise<void>((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    const movie = await this.create({
      title: data.Title,
      description: data.Plot,
      imdb_id: data.imdbID,
      duration: data.Runtime,
      poster: `http://localhost:3001/content/movie/${imdb_id}/poster.jpg`,
      genre: data.Genre.split(', '),
      year: +data.Year,
      rating: data.imdbRating,
      director: data.Director,
      stars: data.Actors.split(', '),
    });
    return movie;
  }
}
