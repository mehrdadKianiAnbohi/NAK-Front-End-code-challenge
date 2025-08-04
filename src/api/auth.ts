import apiClient from "@/config/axios";
import {
  SignInCredentials,
  SignUpCredentials,
  LoginResponse,
  User,
} from "@/types";

export const loginUser = async (
  credentials: SignInCredentials
): Promise<LoginResponse> => {
  const { data } = await apiClient.post("/auth/login", credentials);
  return data;
};

export const registerUser = async (
  userInfo: SignUpCredentials
): Promise<User> => {
  const { data } = await apiClient.post("/users/register", userInfo);
  return data;
};
