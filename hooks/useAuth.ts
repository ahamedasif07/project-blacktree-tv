"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import api from "@/lib/axios";
import useAuthStore, { AuthUser } from "@/store/auth/use-auth-store";
import { useEffect } from "react";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthApiResponse {
  success: boolean;
  message?: string;
  user: AuthUser;
  token?: string;
}

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setUser, logout: clearStore, user } = useAuthStore();

  // 1. Fetch Current Authenticated User
  const { data: currentUser, isLoading } = useQuery<AuthUser | null>({
    queryKey: ["auth-me"],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ success: boolean; user: AuthUser }>("/auth/me");
        return data.user || null;
      } catch {
        return null;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // 2. Sync with Zustand Store
  useEffect(() => {
    if (!isLoading) {
      setUser(currentUser || null);
    }
  }, [currentUser, isLoading, setUser]);

  // 3. Login Mutation (Direct Next.js API)
  const loginMutation = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post<AuthApiResponse>("/auth/login", payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Login successful!");
      setUser(data.user);
      queryClient.setQueryData(["auth-me"], data.user);
      if (data.user?.role === "SUPER_ADMIN" || data.user?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    },
    onError: (err: AxiosError<{ message?: string }>) => {
      toast.error(err.response?.data?.message || "Invalid email or password");
    },
  });

  // 4. Register Mutation (Direct Next.js API)
  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await api.post<AuthApiResponse>("/auth/register", payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Account created successfully!");
      setUser(data.user);
      queryClient.setQueryData(["auth-me"], data.user);
      router.push("/");
    },
    onError: (err: AxiosError<{ message?: string }>) => {
      toast.error(err.response?.data?.message || "Registration failed");
    },
  });

  // 5. Logout Mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      clearStore();
      queryClient.setQueryData(["auth-me"], null);
      toast.success("Logged out successfully");
      router.push("/login");
    },
    onError: (err: AxiosError<{ message?: string }>) => {
      toast.error(err.response?.data?.message || "Logout failed");
    },
  });

  return {
    user: user || currentUser || null,
    isAuthenticated: !!(user || currentUser),
    isLoading,

    // Login
    signIn: loginMutation.mutateAsync,
    isSigningIn: loginMutation.isPending,

    // Register
    signUp: registerMutation.mutateAsync,
    isSigningUp: registerMutation.isPending,

    // Logout
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
};
