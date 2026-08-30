import z from "zod";

export const ZCAuthForgotPassword = z.object({
  email: z.string().email("Invalid email address."),
});

export type ZTAuthForgotPassword = z.infer<typeof ZCAuthForgotPassword>;
