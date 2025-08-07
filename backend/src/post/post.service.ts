import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DatabaseService } from 'src/modules/database/database.service';

@Injectable()
export class PostService {
  constructor(private databaseService: DatabaseService) {}

  async create(createPostDto: CreatePostDto) {
    // const downloadLinkObj = createPostDto.download_links

    // return await this.databaseService.post.create({
    //   data: {
    //     ...createPostDto,
    //     download_links: {
    //       create: {
    //         link_url: createPostDto.download_links,
    //       },
    //     },
    //   },
    // });
    return await this.databaseService.post.create({ data: createPostDto });
  }

  async findAll() {
    return await this.databaseService.post.findMany({
      include: {
        anime: { where: { NOT: { title: undefined } } },
        movie: { where: { NOT: { title: undefined } } },
        series: { where: { NOT: { title: undefined } } },
        likes: true,
        download_links: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.databaseService.post.findUnique({
      where: {
        id,
      },
      include: {
        anime: { where: { NOT: { title: undefined } } },
        movie: { where: { NOT: { title: undefined } } },
        series: { where: { NOT: { title: undefined } } },
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.databaseService.$transaction([
      this.databaseService.downloadLink.deleteMany({ where: { postId: id } }),
      this.databaseService.post.update({ where: { id }, data: updatePostDto }),
    ])[1]; 
  }

  async remove(id: string) {
    return await this.databaseService.post.delete({ where: { id } });
  }
}
