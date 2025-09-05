-- DropForeignKey
ALTER TABLE "Otp" DROP CONSTRAINT "Otp_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "expire_date" TEXT,
ADD COLUMN     "is_premium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "plan_name" TEXT NOT NULL DEFAULT 'free',
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Anime" (
    "id" TEXT NOT NULL,
    "mal_id" TEXT NOT NULL,
    "mal_url" TEXT NOT NULL DEFAULT 'N/A',
    "images_url" TEXT[],
    "poster" TEXT,
    "title" TEXT NOT NULL,
    "title_english" TEXT NOT NULL DEFAULT 'N/A',
    "title_japanese" TEXT NOT NULL DEFAULT 'N/A',
    "type" TEXT NOT NULL DEFAULT 'anime',
    "episodes" TEXT NOT NULL DEFAULT 'N/A',
    "status" TEXT NOT NULL DEFAULT 'N/A',
    "aired_from" TEXT NOT NULL DEFAULT 'N/A',
    "duration" TEXT NOT NULL DEFAULT 'N/A',
    "rating" TEXT NOT NULL DEFAULT 'N/A',
    "mal_score" TEXT NOT NULL DEFAULT 'N/A',
    "mal_scored_by" TEXT NOT NULL DEFAULT 'N/A',
    "mal_rank" TEXT NOT NULL DEFAULT 'N/A',
    "mal_popularity" TEXT NOT NULL DEFAULT 'N/A',
    "description" TEXT NOT NULL DEFAULT 'N/A',
    "season" TEXT NOT NULL DEFAULT 'N/A',
    "year" INTEGER NOT NULL,
    "broadcast" TEXT NOT NULL DEFAULT 'N/A',
    "genre" TEXT[],
    "demographics" TEXT[],
    "streaming" TEXT[],
    "has_subtitle" BOOLEAN NOT NULL DEFAULT false,
    "has_dub" BOOLEAN NOT NULL DEFAULT false,
    "postId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "Id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "DownloadLink" (
    "id" TEXT NOT NULL,
    "episode" TEXT,
    "season" TEXT,
    "link_url" JSONB NOT NULL,
    "quality" TEXT,
    "postId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DownloadLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "rating" TEXT NOT NULL DEFAULT 'N/A',
    "stars" TEXT[],
    "director" TEXT NOT NULL DEFAULT 'N/A',
    "images_url" TEXT[],
    "genre" TEXT[],
    "has_subtitle" BOOLEAN NOT NULL DEFAULT false,
    "has_dub" BOOLEAN NOT NULL DEFAULT false,
    "imdb_id" TEXT NOT NULL,
    "poster" TEXT,
    "language" TEXT[],
    "type" TEXT NOT NULL DEFAULT 'movie',
    "postId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT,
    "extra_info" TEXT,
    "download_info" TEXT,
    "like_count" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'N/A',
    "rating" TEXT NOT NULL DEFAULT 'N/A',
    "stars" TEXT[],
    "director" TEXT NOT NULL DEFAULT 'N/A',
    "poster" TEXT NOT NULL,
    "images_url" TEXT[],
    "genre" TEXT[],
    "has_subtitle" BOOLEAN NOT NULL DEFAULT false,
    "has_dub" BOOLEAN NOT NULL DEFAULT false,
    "imdb_id" TEXT NOT NULL,
    "language" TEXT[],
    "total_seasons" INTEGER NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'N/A',
    "released" TEXT NOT NULL DEFAULT 'N/A',
    "type" TEXT NOT NULL DEFAULT 'series',
    "postId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "transaction_code" TEXT,
    "amount" INTEGER,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchList" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WatchList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostToWatchList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PostToWatchList_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Anime_mal_id_key" ON "Anime"("mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Anime_postId_key" ON "Anime"("postId");

-- CreateIndex
CREATE INDEX "Anime_genre_idx" ON "Anime" USING HASH ("genre");

-- CreateIndex
CREATE INDEX "Anime_title_idx" ON "Anime" USING HASH ("title");

-- CreateIndex
CREATE INDEX "Anime_mal_id_idx" ON "Anime" USING HASH ("mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_key" ON "Like"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_postId_key" ON "Like"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_imdb_id_key" ON "Movie"("imdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_postId_key" ON "Movie"("postId");

-- CreateIndex
CREATE INDEX "Movie_genre_idx" ON "Movie" USING HASH ("genre");

-- CreateIndex
CREATE INDEX "Movie_title_idx" ON "Movie" USING HASH ("title");

-- CreateIndex
CREATE INDEX "Movie_imdb_id_idx" ON "Movie" USING HASH ("imdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "Post_title_key" ON "Post"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Series_imdb_id_key" ON "Series"("imdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "Series_postId_key" ON "Series"("postId");

-- CreateIndex
CREATE INDEX "Series_genre_idx" ON "Series" USING HASH ("genre");

-- CreateIndex
CREATE INDEX "Series_title_idx" ON "Series" USING HASH ("title");

-- CreateIndex
CREATE INDEX "Series_imdb_id_idx" ON "Series" USING HASH ("imdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_transaction_code_key" ON "Subscription"("transaction_code");

-- CreateIndex
CREATE UNIQUE INDEX "WatchList_userId_key" ON "WatchList"("userId");

-- CreateIndex
CREATE INDEX "_PostToWatchList_B_index" ON "_PostToWatchList"("B");

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DownloadLink" ADD CONSTRAINT "DownloadLink_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchList" ADD CONSTRAINT "WatchList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToWatchList" ADD CONSTRAINT "_PostToWatchList_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToWatchList" ADD CONSTRAINT "_PostToWatchList_B_fkey" FOREIGN KEY ("B") REFERENCES "WatchList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
