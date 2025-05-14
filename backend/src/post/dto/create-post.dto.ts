import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsBoolean()
  is_premium?: boolean;

  extra_info?: string;

  download_info?: string;

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
