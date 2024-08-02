"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../../ui";
import { CartSheet } from "./cart-sheet";
import { useCart } from "@/lib/hooks/use-cart";
import { CartItem } from "@/lib/actions/cart";
import React from "react";

interface Props {
  data: CartItem[];
  totalPrice: number;
}

export const CartButton: React.FC<Props> = ({ data, totalPrice }) => {
  const { openCart } = useCart();

  return (
    <>
      <Button variant={"default"} onClick={openCart}>
        <ShoppingCart strokeWidth={2} />
        {totalPrice} грн
      </Button>
      <CartSheet data={data} totalPrice={totalPrice} />
    </>
  );
};
