import React from "react";
import { FormInput } from "../../form-input";
import { cn } from "@/lib/utils";
import { Button, Input } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Login, LoginSchema } from "./schemas";
import { DialogTitle } from "@/components/ui/dialog";

interface Props {
  className?: string;
  toggleType: () => void;
}

export const LoginForm: React.FC<Props> = ({ className, toggleType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <DialogTitle>Авторизация</DialogTitle>
      <p className="text-medium text-center mt-[5px]">
        У вас ещё нет аккаунта?{" "}
        <button
          className="text-accent font-semibold hover:underline"
          onClick={toggleType}
        >
          Создать новый.
        </button>
      </p>
      <form
        className={cn("flex flex-col gap-5 w-full mt-[30px]", className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          title="Ваш E-mail"
          error={errors.email?.message}
          {...register("email")}
        />
        <FormInput
          title="Введите пароль"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button className="mt-[10px]" type="submit">
          Войти
        </Button>
      </form>
    </>
  );
};
