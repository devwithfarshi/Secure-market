import { z } from "zod";
export const AuthCredentialvalidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type TAuthCredentialvalidator = z.infer<typeof AuthCredentialvalidator>;
