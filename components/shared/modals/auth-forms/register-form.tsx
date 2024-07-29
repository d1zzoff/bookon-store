import React from "react";
import { FormInput } from "../../form-input";
import { cn } from "@/lib/utils";
import { Button, Input } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Register, RegisterSchema } from "./schemas";
import { DialogTitle } from "@/components/ui/dialog";

interface Props {
  className?: string;
  toggleType: () => void;
}

export const RegisterForm: React.FC<Props> = ({ className, toggleType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <DialogTitle>Регистрация</DialogTitle>
      <p className="text-medium text-center mt-[5px]">
        У вас уже есть аккаунт?{" "}
        <button
          className="text-accent font-semibold hover:underline"
          onClick={toggleType}
        >
          Войти.
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
          title="Имя пользователя"
          error={errors.email?.message}
          {...register("username")}
        />
        <FormInput
          title="Введите пароль"
          error={errors.password?.message}
          {...register("password")}
        />
        <FormInput
          title="Повторите пароль"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button className="mt-[10px]" type="submit">
          Создать аккаунт
        </Button>
      </form>
    </>
  );
};
