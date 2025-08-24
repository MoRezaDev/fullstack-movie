import * as z from "zod";

export const PhoneNumberValidationSchema = z.object({
  phone: z
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


