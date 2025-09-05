/*
  Warnings:

  - Made the column `postId` on table `DownloadLink` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DownloadLink" ALTER COLUMN "postId" SET NOT NULL;
