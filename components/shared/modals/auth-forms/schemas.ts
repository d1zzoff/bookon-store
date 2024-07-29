import { z, ZodType } from "zod";

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const LoginSchema: ZodType<Login> = z.object({
  email: z.string().email("Некорректный адрес электронной почты"),
  password: z.string().min(6, "Введите корректный пароль"),
});

export const RegisterSchema: ZodType<Register> = z
  .object({
    username: z
      .string()
      .min(4, "Минимально 4 символа")
      .max(16, "Максимально 16 символов"),
    email: z.string().email("Некорректный адрес электронной почты"),
    password: z.string().min(6, "Минимально 6 символов"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"],
  });
