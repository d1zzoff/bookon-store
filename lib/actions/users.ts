"use server";

import { Login, Register } from "@/components/shared/modals/auth-forms/schemas";
import { cookies } from "next/headers";

export interface UserInfo {
  id: number;
  username: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const logout = async () => {
  cookies().delete("_token");
};

export const loginUser = async (data: Login) => {
  const response = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Неверный логин или пароль");
  }

  const resData = await response.json();

  if (resData.accessToken) {
    cookies().set("_token", resData.accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    });
  }

  return null;
};

export const registerUser = async (data: Register) => {
  const response = await fetch("http://localhost:3001/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error("Пользователь с таким именем или почтой уже существует");
    } else {
      throw new Error("Не удалось создать аккаунт");
    }
  }

  const resData = await response.json();

  if (resData.accessToken) {
    cookies().set("_token", resData.accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    });
  }

  return null;
};

export const getUser = async (): Promise<UserInfo | undefined> => {
  const token = cookies().get("_token")?.value;

  const response = await fetch("http://localhost:3001/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return undefined;
  }

  return await response.json();
};
