"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { LoginForm } from "./auth-forms/login-form";
import { Button } from "@/components/ui";
import google from "@/public/assets/google-icon.svg";
import github from "@/public/assets/github-icon.svg";
import Image from "next/image";
import React from "react";
import { RegisterForm } from "./auth-forms/register-form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [type, setType] = React.useState<"login" | "register">("login");

  const router = useRouter();

  const toggleType = () => {
    setType((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {type === "login" ? (
          <LoginForm toggleType={toggleType} onClose={onClose} />
        ) : (
          <RegisterForm toggleType={toggleType} onClose={onClose} />
        )}

        <div className="flex justify-between my-[15px] gap-[10px] items-center">
          <hr className="h-[1px] w-full border-0 bg-grey-300" />
          <p className="text-grey-300 font-medium">Или</p>
          <hr className="h-[1px] w-full border-0 bg-grey-300" />
        </div>
        <div className="flex items-center gap-[10px]">
          <Button
            className="bg-grey-200 hover:bg-grey-200/80 text-dark"
            size={"full"}
          >
            <Image
              width={26}
              height={26}
              src={"/assets/google-icon.svg"}
              alt="google"
            />
            Google
          </Button>
          <Button
            className="bg-grey-200 hover:bg-grey-200/80 text-dark"
            size={"full"}
          >
            <Image
              width={26}
              height={26}
              src={"/assets/github-icon.svg"}
              alt="github"
            />
            Github
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
