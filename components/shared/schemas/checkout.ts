import { z, ZodType } from "zod";

export interface Checkout {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  comment?: string;
}

export const CheckoutSchema: ZodType<Checkout> = z.object({
  phone: z.string().min(1, "Это поле обязательно"),
  email: z.string().email().min(1, "Это поле обязательно"),
  firstName: z.string().min(1, "Это поле обязательно"),
  lastName: z.string().min(1, "Это поле обязательно"),
  address: z.string().min(1, "Это поле обязательно"),
});
