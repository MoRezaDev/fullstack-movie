import { HttpException } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { finished } from 'stream/promises';
import Together from 'together-ai';
import { put } from '@vercel/blob';

export async function deleteFolderWithFiles(path: string) {
  fs.rm(path, { recursive: true, force: true }, (err) => {
    if (err) throw new HttpException(err, 500);
  });
}

export async function deleteMovieFolder(id: string) {
  const staticPath = path.join(
    process.cwd(),
    'src',
    'public',
    'content',
    'movie',
    id,
  );

  fs.rm(staticPath, { recursive: true, force: true }, (err) => {
    if (err) throw new HttpException(err, 500);
  });
}
export async function deleteSeriesFolder(id: string) {
  const staticPath = path.join(
    process.cwd(),
    'src',
    'public',
    'content',
    'series',
    id,
  );

  fs.rm(staticPath, { recursive: true, force: true }, (err) => {
    if (err) {
      throw new HttpException(err, 500);
    }
  });
}
export async function deleteAnimeFolder(id: string) {
  const staticPath = path.join(
    process.cwd(),
    'src',
    'public',
    'content',
    'anime',
    id,
  );

  fs.rm(staticPath, { recursive: true, force: true }, (err) => {
    if (err) throw new HttpException(err, 500);
  });
}

export async function SavePoster(
  imageLink: string,
  id: string,
  type: 'movie' | 'series' | 'anime',
  backgroundLink?: string,
) {
  if (!imageLink || !id || !type)
    throw new HttpException('invalid arguments', 403);

  // ============ OLD FILESYSTEM CODE (Local Save) ============
  /*
  const staticPath = path.join(
    process.cwd(),
    'src',
    'public',
    'content',
    type,
    id,
  );

  const imagePath = path.join(staticPath, 'poster.jpg');
  fs.mkdirSync(staticPath, { recursive: true });

  //creating Stream file
  const writer = fs.createWriteStream(imagePath);

  try {
    const response = await axios.get(imageLink, { responseType: 'stream' });
    response.data.pipe(writer);
    await finished(writer);

    if (backgroundLink) {
      const imagePath = path.join(staticPath, 'background-1280.jpg');
      const writer = fs.createWriteStream(imagePath);

      const response = await axios.get(backgroundLink, {
        responseType: 'stream',
      });

      response.data.pipe(writer);
      await finished(writer);
    }
  } catch (err) {
    console.log('catching error on try catch');
    throw new HttpException(
      err?.message ?? 'something wrong on saving file',
      500,
    );
  }
  return [
    `https://fullstack-movie-backend.vercel.app/content/${type}/${id}/poster.jpg`,
    `https://fullstack-movie-backend.vercel.app/content/${type}/${id}/background-1280.jpg`,
  ];
  */
  // ============================================================================================

  //  NEW CODE (Blob storage, works on Vercel)
  try {
    // download poster as arraybuffer (binary)
    const posterRes = await axios.get(imageLink, {
      responseType: 'arraybuffer',
    });
    const posterBuffer = Buffer.from(posterRes.data);

    const posterBlob = await put(
      `content/${type}/${id}/poster.jpg`,
      posterBuffer,
      {
        access: 'public',
        allowOverwrite: true,
      },
    );

    let backgroundBlobUrl: string | null = null;

    if (backgroundLink) {
      const bgRes = await axios.get(backgroundLink, {
        responseType: 'arraybuffer',
      });
      const bgBuffer = Buffer.from(bgRes.data);

      const bgBlob = await put(
        `content/${type}/${id}/background-1280.jpg`,
        bgBuffer,
        {
          access: 'public',
          allowOverwrite: true,
        },
      );

      backgroundBlobUrl = bgBlob.url;
    }

    return [
      posterBlob.url,
      backgroundBlobUrl ??
        `https://dummyimage.com/1280x720/000/fff&text=No+Background`, // fallback if no bg
    ];
  } catch (err) {
    console.log('catching error on try catch (Blob upload)');
    throw new HttpException(
      err?.message ?? 'something wrong on saving file (Blob)',
      500,
    );
  }
}

export async function translatePersian(content: string) {
  const together = new Together();
  try {
    const response = await together.chat.completions.create({
      model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      messages: [
        {
          role: 'user',
          content: `this is the decription text for the movie,without any external answers like Here are a few Persian translations, with slightly different nuances, to capture the meaning of the description text:\n\n**Option 1 (More Literal) or something else...please translate this text to persian: ${content}. and please in response just show me the translated text without any other text or answers**`,
        },
      ],
    });

    return response.choices[0].message?.content;
  } catch (err) {}
}

//
export function normalizeTitle(str: string): string {
  return str
    .toLowerCase()
    .replace(/[._]/g, ' ')
    .replace(/\s+/g, ' ') // collapse spaces
    .trim();
}
