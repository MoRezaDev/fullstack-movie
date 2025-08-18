import * as z from "zod";

export const imdbValidationSchema = z.object({
  imdb_id: z
    .string("فرمت آیدی Imdb صحیح نیست")
    .trim()
    .toLowerCase()
    .regex(/^tt.+$/),
});
export const myAnimeListValidationSchema = z.object({
  mal_id: z
    .string("فرمت آیدی MyAnimeList صحیح نیست")
    .trim()
    .toLowerCase()
    .regex(/^\d{1,7}$/),
});

export const PostIdValidationSchema = z.object({
  postId: z.string().trim().toLowerCase(),
});

export const PhoneNumberValidationSchema = z.object({
  mobile: z
    .string("فرمت شماره همراه صحیح نیست")
    .trim()
    .toLowerCase()
    .regex(/^\d{11}$/, "فرمت شماره همراه صحیح نیست"),
});

export const VerifyCodeValidationSchema = z.object({
  code: z
    .string("فرمت کد شما صحیح نیست")
    .trim()
    .toLowerCase()
    .regex(/^\d{5}$/, "فرمت کد شما صحیح نیست"),
});
