"use client";

import { Button } from "../ui";
import { Power, User } from "lucide-react";
import { AuthModal } from "./modals/auth-modal";
import React from "react";
import { logout, UserInfo } from "@/lib/actions/users";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import toast from "react-hot-toast";

export const AuthButton = ({
  user,
}: {
  user?: UserInfo | undefined | null;
}) => {
  const [isOpen, setOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();

    toast.success("Вы успешно вышли с аккаунта");
  };

  return (
    <>
      <AuthModal isOpen={isOpen} onClose={() => setOpen(false)} />
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <User strokeWidth={2} />
              {user?.username}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <div className="flex flex-col gap-[10px]">
              <Link
                href={"/profile"}
                className="transition-color duration-200 hover:text-accent"
              >
                Мой профиль
              </Link>
              <Link
                href={"/profile/orders"}
                className="transition-color duration-200 hover:text-accent"
              >
                Мои заказы
              </Link>
            </div>
            <DropdownMenuSeparator />
            <button
              className="flex gap-[5px] items-center text-red hover:underline"
              onClick={handleLogout}
            >
              Выйти
              <Power className="w-4 h-4" />
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant={"outline"} onClick={() => setOpen(true)}>
          <User strokeWidth={2} />
          Войти
        </Button>
      )}
    </>
  );
};
