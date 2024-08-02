"use client";

import { CountButtons } from "@/components/shared/cart/count-buttons";
import { Container } from "@/components/shared/container";
import { FormInput } from "@/components/shared/form-input";
import { Checkout, CheckoutSchema } from "@/components/shared/schemas/checkout";
import { Button } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";

import React from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Checkout>({ resolver: zodResolver(CheckoutSchema) });

  return (
    <Container>
      <h1>Оформление заказа</h1>

      <div className="w-full mt-[40px] flex items-start gap-[30px]">
        <div className="flex-1 flex flex-col gap-5">
          {/* Корзина */}
          <div className="w-full rounded-[20px] p-5 bg-light flex flex-col items-start gap-[30px]">
            <h4>1. Корзина</h4>

            <div className="w-full flex flex-col">
              <div className="h-[85px] flex items-center">
                <div className="w-[70px] h-[70px] bg-grey-200 rounded-[15px]"></div>

                <div className="ml-5">
                  <b>Властелин колец</b>
                  <p className="text-grey-300">Дж. Роулинг</p>
                </div>

                <b className="ml-auto">1 000 грн</b>

                <CountButtons
                  increase={() => {}}
                  decrease={() => {}}
                  quantity={0}
                  className="ml-auto"
                />

                <button className="ml-3">
                  <Trash2 className="w-6 h-6 text-grey-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Личные данные */}
          <div className="w-full rounded-[20px] p-5 bg-light flex flex-col items-start gap-[30px]">
            <h4>2. Контактные данные</h4>

            <form className="grid grid-cols-2 gap-x-[40px] gap-y-[20px] w-full">
              <FormInput
                title="Ваш телефон"
                error={errors.phone?.message}
                {...register("phone")}
              />
              <FormInput
                title="Ваш E-mail"
                error={errors.phone?.message}
                {...register("phone")}
              />
              <FormInput
                title="Ваше имя"
                error={errors.phone?.message}
                {...register("phone")}
              />
              <FormInput
                title="Ваша фамилия"
                error={errors.phone?.message}
                {...register("phone")}
              />
            </form>

            <Button size={"full"}>Продолжить</Button>
          </div>

          {/* Адрес доставки */}
          <div className="w-full rounded-[20px] p-5 bg-light flex flex-col items-start gap-[30px]">
            <h4>3. Адрес доставки</h4>

            <form className="flex flex-col items-start gap-[20px] w-full">
              <FormInput
                title="Введите ваш адрес"
                error={errors.address?.message}
                {...register("address")}
              />
            </form>

            <Button size={"full"}>Продолжить</Button>
          </div>
        </div>

        {/* Блок с ценой */}
        <div className="w-full max-w-[450px] rounded-[20px] bg-light p-5 flex flex-col items-start gap-[30px]">
          <div>
            <h4 className="font-medium">Итого</h4>
            <h2>2 000 грн</h2>
          </div>

          <div className="flex flex-col gap-[15px] w-full">
            <div className="flex items-end w-full justify-between gap-[5px]">
              <p>Стоимость товаров:</p>
              <div className="border-b-2 border-dotted border-b-grey-300 w-full mb-[7px] flex-1" />
              <b>1 000 грн</b>
            </div>

            <div className="flex items-end w-full justify-between gap-[5px]">
              <p>Скидка:</p>
              <div className="border-b-2 border-dotted border-b-grey-300 w-full mb-[7px] flex-1" />
              <b>-500 грн</b>
            </div>

            <div className="flex items-end w-full justify-between gap-[5px]">
              <p>Доставка:</p>
              <div className="border-b-2 border-dotted border-b-grey-300 w-full mb-[7px] flex-1" />
              <b>75 грн</b>
            </div>
          </div>

          <Button size={"lg"} className="w-full">
            Оформить заказ
          </Button>
        </div>
      </div>
    </Container>
  );
}
