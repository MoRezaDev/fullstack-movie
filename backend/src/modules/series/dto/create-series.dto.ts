import { IsArray, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { Prisma } from 'generated/prisma';

export class CreateSeriesDto implements Prisma.SeriesCreateInput {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsInt()
  year: number;
  @IsNotEmpty()
  duration: string;

  status?: string;

  rating?: string;

  stars: string[];

  director?: string;

  images_url?: string[];

  @IsArray()
  genre: string[];

  has_subtitle?: boolean;

  has_dub?: boolean;

  @IsNotEmpty()
  imdb_id: string;

  country?: string;

  language?: string[] | Prisma.SeriesCreatelanguageInput;

  poster: string;

  released?: string;

  total_seasons: number;
}
