import { z } from "zod";

export const signUpInputSchema = z.object({
  username: z.string().email("Username must be an email"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

export type SignUpInput = z.infer<typeof signUpInputSchema>;
