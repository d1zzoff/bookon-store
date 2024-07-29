"use client";

import { Button } from "../ui";
import Link from "next/link";
import { User } from "lucide-react";
import { AuthModal } from "./modals/auth-modal";
import React from "react";

export const AuthButton = () => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      <AuthModal isOpen={isOpen} setOpen={setOpen} />
      <Button variant={"outline"} onClick={() => setOpen(true)}>
        <User strokeWidth={2} />
        Профиль
      </Button>
    </>
  );
};
