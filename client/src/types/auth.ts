export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  avatar?: string;
  isEmailVerified?: boolean;
}

export interface AuthResponse {
  status: string;
  accessToken: string;
  data: {
    user: User;
  };
}
