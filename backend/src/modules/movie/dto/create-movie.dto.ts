import { IsInt, IsNotEmpty, Matches } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9 ]{1,100}$/)
  title: string;

  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9 ]{1,100}$/)
  slug: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsNotEmpty()
  duration: string;

  @IsNotEmpty()
  @IsInt()
  rating: number;

  @IsNotEmpty()
  imdb_id: string;

  stars?: string[];

  director?: string;

  images_url?: string[];

  genre: string[];

  has_subtitle?: boolean;

  has_dub?: boolean;
}
