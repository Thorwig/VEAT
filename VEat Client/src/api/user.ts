import axios from "axios";
import { getJWT } from "./common";

const baseUrl = `http://${process.env.REACT_APP_REVERSE_PROXY}`;

export type userType =
  | "Client"
  | "Driver"
  | "Restaurant Owner"
  | "Technical Admin"
  | "Commercial Admin"
  | "Developer";

export type User = {
  uid: string;
  type: userType;
  name: string;
  surname: string;
  fullAddress: string;
  phoneNumber: string;
  latitude: number;
  longitude: number;
  password: string;
  email: string;
  note?: number;
  referedBy?: string;
  hasRefered?: string[];
};

export type CreateUser = {
  type: userType;
  name: string;
  surname: string;
  password: string;
  fullAddress: string;
  phoneNumber: string;
  email: string;
};

export type UpdateUser = {
  type: userType;
  name: string;
  surname: string;
  fullAddress: string;
  phoneNumber: string;
  password?: string
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type LogIn = {
  message?: string;
  token?: string;
}

type GetUserResponse = {
  state: string;
  message: string;
  user: User;
};

export const logInUser = async (email: string, password: string): Promise<LogIn> => {
  return await axios
    .request<LogIn>({
      method: "POST",
      url: `${baseUrl}/auth/login/client`,
      headers: {
        Authorization: getJWT(),
      },
      data: {
        email: email,
        password: password
      }
    })
    .then((result) => result.data)
};

export const logOutUser = async (token: string) => {
  await axios
    .request({
      method: "POST",
      url: `${baseUrl}/auth/logout`,
      headers: {
        Authorization: getJWT(),
      },
      data: {
        token: token
      }
    });
  localStorage.removeItem("JWT");
};

export const getUserById = async (
  userId: string
): Promise<User> => {
  return await axios
    .request<GetUserResponse>({
      method: "GET",
      url: `${baseUrl}/user/users/${userId}`,
      headers: {
        Authorization: getJWT(),
      },
    })
    .then((result) => result.data.user);
};

export const createUser = async (
  user: CreateUser
): Promise<User> => {
  return await axios
    .request<GetUserResponse>({
      method: "POST",
      url: `${baseUrl}/user/users`,
      headers: {
        Authorization: getJWT(),
      },
      data: user
    })
    .then((result) => result.data.user);
};

export const deleteUser = async (
  userId: string
) => {
  return await axios
    .request({
      method: "DELETE",
      url: `${baseUrl}/user/users/${userId}`,
      headers: {
        Authorization: getJWT(),
      },
    })
};

export const updateUser = async (
  userId: string, user: UpdateUser
): Promise<User> => {
  return await axios
    .request<GetUserResponse>({
      method: "PUT",
      url: `${baseUrl}/user/users/${userId}`,
      headers: {
        Authorization: getJWT(),
      },
      data: user
    })
    .then((result) => result.data.user);
};