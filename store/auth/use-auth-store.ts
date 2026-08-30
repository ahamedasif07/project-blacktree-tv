import { create } from "zustand";
import api from "@/lib/axios";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  image?: string;
  role: string;
  status?: string;
  subscription?: {
    type: string;
  } | null;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSigningIn: boolean;
  isSigningUp: boolean;

  // Actions
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  signIn: (credentials: SignInCredentials) => Promise<boolean>;
  login: (credentials: SignInCredentials) => Promise<boolean>;
  signUp: (credentials: SignUpCredentials) => Promise<boolean>;
  register: (credentials: SignUpCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isSigningIn: false,
  isSigningUp: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  signIn: async (credentials: SignInCredentials) => {
    set({ isSigningIn: true });
    try {
      const response = await api.post("/auth/login", credentials);
      if (response.data?.success && response.data?.user) {
        const user = response.data.user;
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          isSigningIn: false,
        });
        toast.success(response.data.message || "Signed in successfully!");
        return true;
      } else {
        throw new Error(response.data?.message || "Failed to sign in");
      }
    } catch (error) {
      set({ isSigningIn: false });
      const message = getErrorMessage(error, "Failed to sign in");
      toast.error(message);
      throw error;
    }
  },

  login: async (credentials: SignInCredentials) => {
    return get().signIn(credentials);
  },

  signUp: async (credentials: SignUpCredentials) => {
    set({ isSigningUp: true });
    try {
      const response = await api.post("/auth/register", credentials);
      if (response.data?.success && response.data?.user) {
        const user = response.data.user;
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          isSigningUp: false,
        });
        toast.success(response.data.message || "Account created successfully!");
        return true;
      } else {
        throw new Error(response.data?.message || "Failed to sign up");
      }
    } catch (error) {
      set({ isSigningUp: false });
      const message = getErrorMessage(error, "Failed to create account");
      toast.error(message);
      throw error;
    }
  },

  register: async (credentials: SignUpCredentials) => {
    return get().signUp(credentials);
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      toast.success("Logged out successfully");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  },

  fetchUser: async () => {
    try {
      const response = await api.get("/auth/me");
      if (response.data?.success && response.data?.user) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  checkAuth: async () => {
    return get().fetchUser();
  },
}));

export default useAuthStore;