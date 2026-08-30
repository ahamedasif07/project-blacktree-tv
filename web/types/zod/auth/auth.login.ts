import z from "zod";

export const ZCAuthLogin = z.object({
  email: z.email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  rememberMe: z.boolean().optional(),
});

export type ZTAuthLogin = z.infer<typeof ZCAuthLogin>;