"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import useAuthStore, { AuthUser } from "@/store/auth/use-auth-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ZTAuthRegister, ZTAuthLogin, ZTAuthForgotPassword } from "@/types/zod/auth";

export interface ApiErrorResponse {
  message?: string;
  success?: boolean;
}

export interface AuthApiResponse {
  success: boolean;
  message?: string;
  user: AuthUser;
  token?: string;
  data?: {
    requireOTP?: boolean;
  };
}

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setUser, logout: clearStore } = useAuthStore();

  // 1. Fetch Current User
  const { data: user, isLoading, error } = useQuery<AuthUser | null>({
    queryKey: ["auth-me"],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ success: boolean; user: AuthUser }>("/auth/me");
        return data.user || null;
      } catch (err) {
        return null;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // 2. Sync Query result with Zustand Store
  useEffect(() => {
    if (!isLoading) {
      setUser(user || null);
    }
  }, [user, isLoading, setUser]);

  // 3. Logout Mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      clearStore();
      queryClient.setQueryData(["auth-me"], null);
      router.push("/login");
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(err.response?.data?.message || "Logout failed");
    },
  });

  // 4. Sign Up Mutation
  const signUpMutation = useMutation({
    mutationFn: async (payload: ZTAuthRegister) => {
      const { data } = await api.post<AuthApiResponse>("/auth/register", payload);
      return { data, email: payload.email };
    },
    onSuccess: (result) => {
      toast.success("Account created successfully!");
      if (result.data.user) {
        setUser(result.data.user);
        queryClient.invalidateQueries({ queryKey: ["auth-me"] });
        router.push("/");
      } else {
        router.push("/login");
      }
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(err.response?.data?.message || "Registration failed");
    },
  });

  // 5. Direct Sign In Mutation
  const signInMutation = useMutation({
    mutationFn: async (payload: Pick<ZTAuthLogin, "email" | "password">) => {
      const { data } = await api.post<AuthApiResponse>("/auth/login", payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success("Login successful!");
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ["auth-me"] });
      if (data.user?.role === "SUPER_ADMIN" || data.user?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(err.response?.data?.message || "Invalid email or password");
    },
  });

  // 6. Sign In Initiate Mutation
  const signInInitiateMutation = useMutation({
    mutationFn: async (payload: Pick<ZTAuthLogin, "email" | "password">) => {
      const { data } = await api.post<AuthApiResponse>("/auth/login-initiate", payload);
      return data;
    },
    onSuccess: (data) => {
      if (data.success && !data.data?.requireOTP) {
        toast.success("Login successful!");
        setUser(data.user);
        queryClient.invalidateQueries({ queryKey: ["auth-me"] });
        if (data.user?.role === "SUPER_ADMIN" || data.user?.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(err.response?.data?.message || "Invalid credentials");
    },
  });

  // 7. Sign In Verify Mutation (2nd step of 2FA if used)
  const signInVerifyMutation = useMutation({
    mutationFn: async (payload: ZTAuthLogin & { otp: string }) => {
      const { data } = await api.post<AuthApiResponse>("/auth/login-verify", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Login successful!");
      queryClient.invalidateQueries({ queryKey: ["auth-me"] });
      router.push("/");
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(err.response?.data?.message || "Invalid or expired OTP");
    },
  });

  // 8. Forgot Password Mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: async (payload: ZTAuthForgotPassword) => {
      const { data } = await api.post<AuthApiResponse>("/auth/forgot-password", payload);
      return data;
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(err.response?.data?.message || "Failed to send reset code");
    },
  });

  // 9. Reset Password Mutation
  const resetPasswordMutation = useMutation({
    mutationFn: async (payload: { email: string; otp: string; password: string }) => {
      const { data } = await api.post<AuthApiResponse>("/auth/reset-password", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Password reset successful!");
      router.push("/login");
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(err.response?.data?.message || "Failed to reset password");
    },
  });

  // 10. Verify Email OTP Mutation (for Signup / general email verification)
  const verifyEmailOtpMutation = useMutation({
    mutationFn: async (payload: { email: string; otp: string }) => {
      const { data } = await api.post<AuthApiResponse>("/auth/verify-otp", {
        email: payload.email,
        code: payload.otp,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Email verified successfully! Please sign in.");
      router.push("/login");
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(err.response?.data?.message || "Verification failed");
    },
  });

  // 11. Verify Reset OTP Mutation (for Reset Password flow)
  const verifyResetOtpMutation = useMutation({
    mutationFn: async (payload: { email: string; otp: string }) => {
      const { data } = await api.post<AuthApiResponse>("/auth/verify-reset-otp", payload);
      return data;
    },
    onSuccess: (_, variables) => {
      toast.success("OTP verified successfully! Set your new password.");
      router.push(
        `/reset-password?email=${encodeURIComponent(variables.email)}&otp=${encodeURIComponent(variables.otp)}`
      );
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(err.response?.data?.message || "Invalid or expired OTP");
    },
  });

  // 12. Resend OTP Mutation
  const resendOtpMutation = useMutation({
    mutationFn: async (payload: { email: string; type: string }) => {
      const { data } = await api.post<AuthApiResponse>("/auth/resend-otp", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("OTP code resent successfully!");
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    },
  });

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    
    signUp: signUpMutation.mutate,
    isSigningUp: signUpMutation.isPending,
    signUpError: signUpMutation.error,

    signIn: signInMutation.mutateAsync,
    isSigningIn: signInMutation.isPending,

    signInInitiate: signInInitiateMutation.mutateAsync,
    isSigningInInitiate: signInInitiateMutation.isPending,

    signInVerify: signInVerifyMutation.mutate,
    isSigningInVerify: signInVerifyMutation.isPending,

    forgotPassword: forgotPasswordMutation.mutateAsync,
    isForgotPasswordPending: forgotPasswordMutation.isPending,

    resetPassword: resetPasswordMutation.mutate,
    isResettingPassword: resetPasswordMutation.isPending,

    verifyEmailOtp: verifyEmailOtpMutation.mutate,
    isVerifyingEmailOtp: verifyEmailOtpMutation.isPending,

    verifyResetOtp: verifyResetOtpMutation.mutate,
    isVerifyingResetOtp: verifyResetOtpMutation.isPending,

    resendOtp: resendOtpMutation.mutate,
    isResendingOtp: resendOtpMutation.isPending,
  };
};
