import { HttpException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

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
    if (err) throw new HttpException(err, 500);
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
