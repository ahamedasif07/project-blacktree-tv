export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  isSubscribed: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}
