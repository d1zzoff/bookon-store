"use client";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import React from "react";
import { Rating } from "../rating";
import { Product } from "@/lib/actions/products";
import Link from "next/link";
import { truncate } from "@/lib/utils/truncate";
import toast from "react-hot-toast";
import { addToCart } from "@/lib/actions/cart";
import { useCart } from "@/lib/hooks/use-cart";

interface Props {
  className?: string;
  item: Product;
}

export const ProductItem: React.FC<Props> = ({ className, item }) => {
  const { openCart } = useCart();

  const handleAddToCart = async () => {
    try {
      await addToCart(item.id);

      toast.success("Вы успешно добавили товар в корзину");
    } catch (err: any) {
      toast.error("Не удалось добавить товар в корзину");
    }
  };

  return (
    <div
      className={cn("w-full max-w-[290px] h-[465px] flex flex-col", className)}
    >
      <Link href={`product/${item.link}`}>
        <div className="w-full h-[260px] rounded-[15px] bg-grey-100 relative">
          <img
            className="absolute w-full h-full object-contain"
            src={item.images[0]}
            alt={item.title}
          />
        </div>

        <div className="flex flex-col items-start gap-[7px] mt-[15px]">
          <h4 className="leading-[120%]">{truncate(item.title, 40)}</h4>
          <p className="text-grey-400 font-medium leading-none">
            {item.author}
          </p>
        </div>
      </Link>

      <div className="flex flex-col gap-[5px] items-start mt-auto">
        <p className="text-green">В наличии</p>

        <div className="flex items-center w-full justify-between">
          <h3>{item.price} грн</h3>
          <Rating value={item.rating} className="mx-[-2px]" />
        </div>

        {item.inCart ? (
          <Button size={"full"} onClick={openCart}>
            В корзине
          </Button>
        ) : (
          <Button size={"full"} onClick={handleAddToCart} variant={"outline"}>
            + Добавить
          </Button>
        )}
      </div>
    </div>
  );
};
