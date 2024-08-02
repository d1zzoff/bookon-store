"use client";

import { CartItem, decreaseCart, increaseCart } from "@/lib/actions/cart";
import React from "react";
import { CountButtons } from "./count-buttons";
import toast from "react-hot-toast";

export const CartSheetItem = ({ item }: { item: CartItem }) => {
  const handleIncrease = async () => {
    try {
      await increaseCart(item.product.id);
    } catch (err: any) {
      toast.error("Не удалось увеличить кол-во товаров в корзине");
    }
  };

  const handleDecrease = async () => {
    try {
      await decreaseCart(item.product.id);
    } catch (err: any) {
      toast.error("Не удалось уменьшить кол-во товаров в корзине");
    }
  };

  return (
    <div className="w-full px-6 py-5 bg-light flex gap-[15px] items-start">
      {/* Картинка товара слева */}
      <div className="w-[90px] h-[90px] rounded-[15px] bg-grey-200 flex-shrink-0 relative">
        <img
          src={item.product.images[0]}
          alt="Image"
          className="w-full h-full object-contain absolute z-[5]"
        />
      </div>

      {/* Информация о товаре справа */}
      <div className="w-full">
        <div className="flex flex-col items-start mb-2">
          <p className="font-bold">{item.product.title}</p>
          <h6 className="text-grey-400">{item.product.author}</h6>

          <h6 className="mt-2 text-green">В наличии</h6>
        </div>

        <hr className="w-full h-[1px] border-none bg-grey-200" />

        <div className="w-full flex items-center justify-between mt-[15px]">
          {/* Счетчик кол-ва товаров */}
          <CountButtons
            quantity={item.quantity}
            increase={handleIncrease}
            decrease={handleDecrease}
          />

          <b>{item.product.price} грн</b>
        </div>
      </div>
    </div>
  );
};
