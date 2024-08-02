"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "../ui";
import { useCart } from "@/lib/hooks/use-cart";
import React from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { addToCart } from "@/lib/actions/cart";

interface Props {
  className?: string;
  inCart: boolean;
  id: number;
}

export const ProductButtons: React.FC<Props> = ({ className, inCart, id }) => {
  const { openCart } = useCart();

  const handleAddToCart = async () => {
    try {
      await addToCart(id);

      toast.success("Вы успешно добавили товар в корзину");
    } catch (err: any) {
      toast.error("Не удалось добавить товар в корзину");
    }
  };

  return (
    <div className={cn("flex items-center gap-[10px]", className)}>
      {inCart ? (
        <Button
          className="max-w-[300px] mt-[5px]"
          size={"full"}
          onClick={openCart}
        >
          В корзине
        </Button>
      ) : (
        <Button
          className="max-w-[300px] mt-[5px]"
          size={"full"}
          onClick={handleAddToCart}
        >
          <ShoppingCart />
          Добавить в корзину
        </Button>
      )}
      <Button
        className="max-w-[300px] mt-[5px]"
        size={"full"}
        variant={"outline"}
      >
        <Heart />В избранное
      </Button>
    </div>
  );
};
