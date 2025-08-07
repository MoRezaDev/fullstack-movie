import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Prisma } from 'generated/prisma';

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

  @ValidateNested()
  download_links?: Prisma.DownloadLinkCreateNestedManyWithoutPostInput 
}
