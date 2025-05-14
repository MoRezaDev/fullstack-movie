import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateSeriesDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsInt()
  year: number;
  @IsNotEmpty()
  duration: string;

  status?: string;

  @IsNumber()
  rating: number;

  stars: string[];

  director?: string;

  images_url?: string[];

  @IsArray()
  genre: string[];

  has_subtitle?: boolean;

  has_dub?: boolean;

  @IsNotEmpty()
  imdb_id: string;
}
