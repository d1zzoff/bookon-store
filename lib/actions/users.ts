import { Register } from "@/components/shared/modals/auth-forms/schemas";

export interface UserInfo {
  id: number;
  username: string | null;
  email: string;
}

export const registerUser = async (data: Register): Promise<UserInfo> => {
  return fetch("http://localhost:3001/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
