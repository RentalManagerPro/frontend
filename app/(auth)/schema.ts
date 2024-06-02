import { z } from "zod";

export const credentialsSchema = z.object({
  username: z.string().email("Username must be an email"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

export type CredentialsType = z.infer<typeof credentialsSchema>;
