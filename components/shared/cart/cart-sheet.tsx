"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../../ui/sheet";
import { cn } from "@/lib/utils";
import { Button } from "../../ui";
import { CartSheetItem } from "./cart-sheet-item";
import { CartItem, getCart } from "@/lib/actions/cart";
import { useCart } from "@/lib/hooks/use-cart";
import Link from "next/link";

interface Props {
  className?: string;
  data: CartItem[];
  totalPrice: number;
}

export const CartSheet: React.FC<Props> = ({ className, data, totalPrice }) => {
  const { open, closeCart } = useCart();

  return (
    <Sheet open={open} onOpenChange={closeCart}>
      <SheetContent
        className={cn(
          "bg-grey-100 border-none w-full max-w-[395px] flex flex-col",
          className
        )}
      >
        <SheetHeader>
          <h4 className="text-[20px] font-normal w-full">
            В корзине <span className="font-bold">3 товар(а/ов)</span>
          </h4>
        </SheetHeader>
        <div className="flex flex-col gap-[10px] mx-[-24px] overflow-y-auto">
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <CartSheetItem key={index} item={item} />
            ))}
        </div>
        <div className="flex sm:flex-col gap-[10px] mt-auto">
          <div className="flex items-end w-full justify-between gap-[5px]">
            <p className="font-semibold">Итого:</p>
            <div className="border-b-2 border-dotted border-b-grey-300 w-full mb-[7px] flex-1" />
            <h4 className="font-bold">{totalPrice} грн</h4>
          </div>
          <Link href={"/checkout"}>
            <Button size={"full"} onClick={closeCart}>
              Оформить заказ
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
