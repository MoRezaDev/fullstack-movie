import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  description: string;

  is_premium?: boolean;

  extra_info?: string;

  download_info?: string;

  status?: string;

  movie?: {
    connect: {
      id: string;
    };
  };

  series?: {
    connect: {
      id: string;
    };
  };

  anime?: {
    connect: {
      id: string;
    };
  };

  download_links?: {
    create: {
      title: string;
      episode?: string;
      season?: number;
      link_url: string[];
    }[];
  };
}
