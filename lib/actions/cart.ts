"use server";

import { cookies } from "next/headers";
import { Product } from "./products";
import { revalidateTag } from "next/cache";

export interface CartItem {
  quantity: number;
  product: Product;
}

export const addToCart = async (productId: number) => {
  const token = cookies().get("_token")?.value;
  const cartToken = cookies().get("cartToken")?.value;

  const response = await fetch("http://localhost:3001/cart", {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Cookie: `cartToken=${cartToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Не удалось добавить товар в корзину");
  }

  const resData = await response.json();

  if (resData.token) {
    cookies().set("cartToken", resData.token);
  }

  revalidateTag("get-cart");
  revalidateTag("get-product");
  revalidateTag("catalog-products");

  return null;
};

export const increaseCart = async (productId: number) => {
  const token = cookies().get("_token")?.value;
  const cartToken = cookies().get("cartToken")?.value;

  const response = await fetch("http://localhost:3001/cart/increase", {
    method: "PATCH",
    body: JSON.stringify({ productId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Cookie: `cartToken=${cartToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Не удалось увеличить кол-во товара");
  }

  revalidateTag("get-cart");

  return await response.json();
};

export const decreaseCart = async (productId: number) => {
  const token = cookies().get("_token")?.value;
  const cartToken = cookies().get("cartToken")?.value;

  const response = await fetch("http://localhost:3001/cart/decrease", {
    method: "PATCH",
    body: JSON.stringify({ productId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Cookie: `cartToken=${cartToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Не удалось увеличить кол-во товара");
  }

  const resData = await response.json();

  if (resData && resData.deleted) {
    revalidateTag("catalog-products");
    revalidateTag("get-product");
  }

  revalidateTag("get-cart");

  return null;
};

export const getCart = async (): Promise<CartItem[]> => {
  const token = cookies().get("_token")?.value;
  const cartToken = cookies().get("cartToken")?.value;

  const response = await fetch("http://localhost:3001/cart", {
    next: { tags: ["get-cart"] },
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: `cartToken=${cartToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Не удалось добавить товар в корзину");
  }

  return await response.json();
};
