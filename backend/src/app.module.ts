import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MovieModule } from './modules/movie/movie.module';
import { PostModule } from './post/post.module';
import { SeriesModule } from './modules/series/series.module';
import { AnimeModule } from './modules/anime/anime.module';
import { WatchlistModule } from './modules/watchlist/watchlist.module';
import { LikeModule } from './modules/like/like.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 3,
        },
      ],
    }),
    MovieModule,
    PostModule,
    SeriesModule,
    AnimeModule,
    WatchlistModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
