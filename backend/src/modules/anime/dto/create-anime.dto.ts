import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateAnimeDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsInt()
  year: number;

  @IsNotEmpty()
  duration: string;

  status?: string;

  stars?: string[];

  director?: string;

  images_url?: string[];

  genre?: string[];

  has_subtitle?: boolean;

  has_dub?: boolean;

  @IsNotEmpty()
  imdb_id: string;

  imdb_rating?: string;

  @IsNotEmpty()
  mal_id: string;

  mal_rating?: string;
}
