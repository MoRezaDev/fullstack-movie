import { IsNotEmpty } from 'class-validator';

export class CreateWatchlistDto {
  @IsNotEmpty()
  title: string;

  description?: string;

  posts?: {
    connect: {
      id: string;
    }[];
  };

  user: {
    connect: {
      id: string;
    };
  };
}
