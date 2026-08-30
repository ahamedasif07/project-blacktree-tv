import z from "zod";

export const ZCAuthVerifyOtp = z.object({
  otp: z.string().length(6, "OTP must be 6 digits."),
});

export type ZTAuthVerifyOtp = z.infer<typeof ZCAuthVerifyOtp>;
