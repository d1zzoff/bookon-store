import React from "react";
import { FormInput } from "../../form-input";
import { cn } from "@/lib/utils";
import { Button, Input } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Login, LoginSchema } from "./schemas";
import { DialogTitle } from "@/components/ui/dialog";
import { loginUser } from "@/lib/actions/users";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  toggleType: () => void;
  onClose: () => void;
}

export const LoginForm: React.FC<Props> = ({
  className,
  toggleType,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = async (data: Login) => {
    try {
      await loginUser(data);

      toast.success("Вы успешно авторизовались");

      onClose();
    } catch (err: any) {
      toast.error(err.message);
    }
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
          type="password"
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
