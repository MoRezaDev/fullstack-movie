# Fullstack Movie — Backend (NestJS + Prisma)

Backend سرویس پروژه Fullstack Movie با NestJS 11، Prisma و PostgreSQL. این سرویس APIهای مربوط به احراز هویت (OTP + JWT)، مدیریت محتوا (Movie/Series/Anime + Post)، واچ‌لیست، لایک، جستجو و اسلایدر را فراهم می‌کند. همچنین فایل‌های استاتیک پوستر/پس‌زمینه محتوا را سرو می‌کند.


## تکنولوژی‌ها
- Node.js 18+
- NestJS 11 (@nestjs/common, core, jwt, throttler, serve-static, config)
- Prisma ORM + PostgreSQL
- Axios برای فراخوانی APIهای OMDb / TMDB / Jikan
- Together AI برای ترجمه توضیحات محتوا (اختیاری)
- Cookie-Parser برای احراز هویت مبتنی بر کوکی
- ESLint + Prettier


## ساختار پوشه‌ها (backend)
- src/
  - main.ts (بوت‌استرپ Nest, CORS, Pipes, Filters)
  - app.module.ts (ماژول ریشه، ماژول‌ها، Rate limiting)
  - common/
    - filters/new-all-exceptions.ts (فیلتر سراسری خطا)
    - gurds/ (VerifyJwtGurds, RolesGurd, VerifyPremiumUserGurd)
    - helper/functions.ts (ذخیره پوستر، حذف پوشه‌ها، ترجمه، normalize)
    - types/ (انواع مشترک)
  - modules/
    - database/ (DatabaseService extends PrismaClient)
    - auth/ (OTP + JWT)
    - user/
    - movie/
    - series/
    - anime/
    - post/
    - like/
    - watchlist/
    - content/ (Query/Slider/FindBySlug/Advanced Search)
  - public/ (فایل‌های استاتیک)
- prisma/
  - schema.prisma (پیکربندی Prisma)
  - models/*.prisma (مدل‌های دیتابیس)
  - migrations/ (مهاجرت‌ها)
- generated/prisma (خروجی prisma client)
- vercel.json (تنظیمات دیپلوی سرورلس)


## راه‌اندازی سریع
1) پیش‌نیازها
- Node.js 18+ و npm
- PostgreSQL در حال اجرا

2) نصب وابستگی‌ها
- داخل پوشه backend اجرا کنید:

  - npm install

  اسکریپت postinstall به صورت خودکار prisma generate را اجرا می‌کند.

3) تنظیم متغیرهای محیطی (.env)
نمونه پیشنهادی:

DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public
PORT=3001
# OMDb: کلید خود را از https://www.omdbapi.com دریافت کنید و BASE را به شکل زیر تنظیم کنید
MOVIE_BASE_URL=https://www.omdbapi.com/?apikey=OMDB_API_KEY&
# TMDB v4: مقدار فقط توکن باشد (بدون "Bearer ")
TMDB_API_KEY=TMDB_V4_TOKEN
# Jikan (MyAnimeList)
Anime_BASE_URL=https://api.jikan.moe/v4/anime
# Together AI (اختیاری برای ترجمه)
TOGETHER_API_KEY=YOUR_TOGETHER_API_KEY

4) راه‌اندازی دیتابیس (Prisma)
- اعمال مهاجرت‌ها در محیط توسعه:

  - npx prisma migrate dev

- در تولید:

  - npx prisma migrate deploy

- مشاهده دیتابیس با Prisma Studio (اختیاری):

  - npx prisma studio

5) اجرای پروژه
- توسعه:

  - npm run start:dev

- تولید:

  - npm run build
  - npm run start:prod


## پیکربندی برنامه
- CORS: در src/main.ts فعال شده با مبداهای زیر:
  - http://localhost:3000
  - http://localhost:5173
  - https://fullstack-movie-git-main-morezadevs-projects.vercel.app
  - https://fullstack-movie.vercel.app
  credentials: true

- Pipes/Filters:
  - ValidationPipe با transform=true به صورت سراسری
  - CatchEverythingFilter برای هندل خطاها به فرمت یکنواخت

- Rate Limiting: Throttler به صورت APP_GUARD فعال است. برای /auth/send-otp محدودیت 5 درخواست در دقیقه اعمال شده.

- Serve Static:
  - مسیر سرو استاتیک: src/public (پوسترها و پس‌زمینه‌ها در content/{type}/{id}/)


## دیتابیس (Prisma Models)
- User: mobile (unique), role (USER/...), is_premium, plan_name, expire_date, روابط با Otp, WatchList, Like, Comment, Subscription
- Otp: code, expire_date, user (1-1)
- Post: title, slug, description, is_premium, like_count, views, روابط 1-1 با Movie/Series/Anime و 1-N با DownloadLink/Comment/Like
- Movie: با کلید imdb_id (unique), اطلاعات فیلم، rating_search برای فیلتر
- Series: با کلید imdb_id (unique)، اطلاعات سریال، total_seasons
- Anime: با کلید mal_id (unique)، اطلاعات انیمه از Jikan، rating_search
- WatchList: یک واچ‌لیست برای هر کاربر (userId unique)، posts (N-M)
- Like: لایک‌های کاربر به پست‌ها (نگاه به نکات مهم در انتها)
- DownloadLink: لینک‌های دانلود (JSON)، متصل به Post
- Comment, Subscription: مطابق نام

Prisma Client از مسیر generated/prisma تولید می‌شود و در DatabaseService استفاده شده است.


## احراز هویت
- OTP Login:
  - POST /auth/send-otp
    - Body: { mobile: string }
    - خروجی فعلی شامل کد OTP و expire_date است (برای توسعه). در تولید باید ارسال SMS جایگزین شود و کد در پاسخ برنگردد.

  - POST /auth/check-otp
    - Body: { mobile: string, code: number }
    - در صورت موفقیت، کوکی httpOnly با نام token ست می‌شود (secure: true, sameSite: 'none', maxAge: 1h) و همچنین token در پاسخ ارسال می‌شود.

- Session:
  - GET /auth/session (نیاز به JWT)
  - Guard: VerifyJwtGurds
  - ابزار احراز هویت:
    - ارسال توکن در Cookie با نام token
    - یا Header: Authorization: Bearer <token>

- JWT:
  - JwtModule global با secret هاردکد شده در کد (secret key!35u3) و expiry = 10m
  - توصیه می‌شود این مقدار به ENV منتقل شود.


## ماژول‌ها و اندپوینت‌ها
نکته: DTOها Validation دارند. برخی اندپوینت‌ها برای مدیریت/ادمین هستند (add/find/updateAll/removeAll).

- Auth
  - POST /auth/send-otp
  - POST /auth/check-otp
  - GET /auth/session

- User (Guard: VerifyJwtGurds در سطح کنترلر)
  - POST /user
  - GET /user (Roles: EDITOR | ADMIN)
  - POST /user/sub (افزودن اشتراک، نیاز به { amount, transaction_code })
  - GET /user/delete-all
  - GET /user/:id
  - PATCH /user/:id
  - DELETE /user/:id

- Post
  - POST /post
  - GET /post?page=1 (صفحه‌بندی 8 موردی، شامل محتوای مرتبط)
  - GET /post/search?query=...
  - GET /post/type/:type (type: anime|movie|series) — آخرین 4 پست از هر نوع
  - GET /post/:id
  - PATCH /post/:id (پاک‌سازی DownloadLinkها و سپس به‌روزرسانی)
  - DELETE /post/:id

- Content
  - GET /content?query=... (جستجوی عنوان بین Movie/Series/Anime)
  - GET /content/slider (آخرین 10 پست به همراه content + type)
  - POST /content/find-by-slug { slug }
    - اگر slug تطبیق کامل نداشته باشد redirect به slug درست می‌دهد.
    - رفتار محتواهای premium در بخش نکات مهم توضیح داده شده.
  - GET /content/s
    - Query: type=[anime|movie|series] (اجباری)
    - Optional: genre, is_dubbed, score, year_from, year_to
    - خروجی: آرایه پست‌ها با content و type

- Movie
  - POST /movie
  - GET /movie
  - GET /movie/find-add?imdb_id=tt123...
    - اگر نبود، از OMDb و TMDB دریافت و ذخیره، پوستر/پس‌زمینه ذخیره می‌شود.
    - توضیحات با Together AI به فارسی ترجمه می‌شوند (در صورت تنظیم TOGETHER_API_KEY).
  - POST /movie/translate (Body: { description })
  - POST /movie/update-all (Bulk update)
  - GET /movie/:id (id = imdb_id)
  - PATCH /movie/:id
  - DELETE /movie/:id
  - DELETE /movie/remove-all

- Series
  - POST /series
  - GET /series
  - GET /series/find-add?imdb_id=tt...
  - POST /series/update-all
  - GET /series/:id (id = imdb_id)
  - PATCH /series/:id
  - DELETE /series/:id (حذف رکورد + فولدر پوستر)

- Anime
  - POST /anime
  - GET /anime
  - GET /anime/find-add?mal_id=12345
  - POST /anime/update-all
  - GET /anime/remove-all
  - GET /anime/:id (id = mal_id)
  - PATCH /anime/:id
  - DELETE /anime/:id (حذف رکورد + فولدر پوستر)

- Watchlist
  - POST /watchlist (بدنه به سبک Prisma connect)
  - GET /watchlist (با include user و posts + محتوای مرتبط)
  - GET /watchlist/:id
  - PATCH /watchlist/:id
  - DELETE /watchlist/:id

- Like
  - POST /like/toggle (بدنه به سبک Prisma)
    - Body نمونه:
      {
        "user": { "connect": { "id": "USER_ID" } },
        "post": { "connect": { "id": "POST_ID" } }
      }
  - GET /like


## جریان فایل‌های استاتیک پوستر
- تابع SavePoster در common/helper/functions.ts:
  - فایل‌ها را در مسیر src/public/content/{type}/{id}/poster.jpg و background-1280.jpg ذخیره می‌کند.
  - آدرس بازگشتی به‌صورت hardcoded روی دامنه https://fullstack-movie.onrender.com/content/... است. در صورت تغییر دامنه، این مقدار باید در کد به‌روزرسانی شود.


## اسکریپت‌ها
- build: nest build
- start: nest start
- start:dev: nest start --watch
- start:prod: node dist/main
- lint: eslint --fix
- format: prettier --write
- test, test:watch, test:cov, test:e2e (Jest/ts-jest)


## دیپلوی (Vercel)
- vercel.json طوری تنظیم شده که درخواست‌ها به src/main.ts هدایت شوند و dist/** شامل شود.
- متغیرهای محیطی ضروری (DATABASE_URL، MOVIE_BASE_URL، TMDB_API_KEY، Anime_BASE_URL، TOGETHER_API_KEY، PORT) را در داشبورد Vercel تنظیم کنید.
- توجه: سیستم فایل سرورلس پایدار نیست. ذخیره پوستر در دیپلوی سرورلس ممکن است پایدار نباشد. برای تولید از فضای ذخیره‌سازی پایدار (S3/Cloud Storage) یا سرور دائمی استفاده کنید.


## نکات مهم و موارد قابل بهبود
- امنیت JWT:
  - secret در کد هاردکد شده است. پیشنهاد: استفاده از ENV (JWT_SECRET) و تنظیم JwtModule.register بر اساس ConfigService.

- OTP در توسعه:
  - سرویس /auth/send-otp کد OTP را در پاسخ برمی‌گرداند (برای توسعه). در تولید باید به سرویس پیامک متصل شود و کد در پاسخ ارسال نشود.

- Premium gating در Content:
  - در ContentService از @UseGuards(VerifyPremiumUserGurd) روی متد سرویس استفاده شده که در NestJS اثری ندارد (Guard باید روی کنترلر/هندلر باشد). همچنین در ContentController روی مسیر find-by-slug هیچ Guardی اعمال نشده است. بنابراین user معمولاً undefined خواهد بود و شرط محدودسازی دانلود برای پست‌های premium اجرا نمی‌شود.
  - راهکار: افزودن @UseGuards(VerifyPremiumUserGurd) روی متد کنترلر find-by-slug یا استفاده از Interceptor/Middleware جهت تزریق کاربر.

- مدل Like در Prisma:
  - همزمان userId و postId به‌صورت @unique تعریف شده‌اند و در عین حال @@id([userId, postId]) نیز وجود دارد. این وضعیت اجازه نمی‌دهد یک کاربر بیش از یک Like برای پست‌های مختلف داشته باشد یا یک پست بیش از یک Like از کاربران مختلف بگیرد.
  - راهکار: حذف @unique از userId و postId و نگه داشتن کلید مرکب @@id([userId, postId]).

- دامنه ثابت در SavePoster:
  - URL بازگشتی سخت‌کد شده است. باید نسبت به محیط (DEV/PROD) قابل پیکربندی شود.

- مسیر ServeStatic:
  - در تولید باید مطمئن شوید مسیر فایل‌های استاتیک مطابق build (dist) تنظیم شده یا از ConfigModule استفاده کنید.


## نمونه درخواست‌ها
- ارسال OTP:
  curl -X POST http://localhost:3001/auth/send-otp -H "Content-Type: application/json" -d '{"mobile":"09123456789"}'

- ورود با OTP:
  curl -X POST http://localhost:3001/auth/check-otp -H "Content-Type: application/json" -d '{"mobile":"09123456789","code":12345}' -i
  توجه: کوکی token در پاسخ ست می‌شود.

- گرفتن سشن:
  curl http://localhost:3001/auth/session -H "Authorization: Bearer <JWT>"

- افزودن فیلم با IMDB ID:
  curl "http://localhost:3001/movie/find-add?imdb_id=tt1375666"

- جستجوی محتوای پیشرفته:
  curl "http://localhost:3001/content/s?type=movie&genre=Sci-Fi&score=7&year_from=2000&year_to=2020"


## کدنویسی و کیفیت
- ESLint و Prettier پیکربندی شده‌اند. از npm run lint و npm run format استفاده کنید.
- Validation در DTOها اعمال می‌شود و فیلتر سراسری پاسخ خطاها را یکنواخت می‌کند.


## مجوز
UNLICENSED (مطابق package.json)
