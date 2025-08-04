interface UserWithPassword {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
}

export type User = Omit<UserWithPassword, "password">;

export type SignUpCredentials = Omit<UserWithPassword, "id">;

export type SignInCredentials = Pick<UserWithPassword, "userName" | "password">;

export interface LoginResponse {
  access_token: string;
}
