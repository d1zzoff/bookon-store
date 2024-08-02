"use server";

import { cookies } from "next/headers";

export interface Category {
  id: number;
  text: string;
  value: string;
}

export interface Language {
  id: number;
  text: string;
  value: string;
}

export interface Product {
  id: number;
  images: string[];
  title: string;
  description: string | null;
  rating: number;
  author: string;
  link: string;
  price: number;
  count: number;
  category: Category;
  language: Language;
  createdAt: string;
  updatedAt: string;
  inCart: boolean;
}

export const getSearchProducts = async (search: string): Promise<Product[]> => {
  return await fetch(`http://localhost:3001/products?search=${search}`, {
    cache: "no-cache",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getProducts = async (filters?: string): Promise<Product[]> => {
  const cartToken = cookies().get("cartToken")?.value;

  return await fetch(`http://localhost:3001/products?${filters || ""}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies().get("_token")?.value}`,
      Cookie: `cartToken=${cartToken}`,
    },
    next: { revalidate: 600, tags: ["catalog-products"] },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getProductById = async (uuid: string): Promise<Product> => {
  const cartToken = cookies().get("cartToken")?.value;

  return await fetch(`http://localhost:3001/products/${uuid}`, {
    headers: {
      Authorization: `Bearer ${cookies().get("_token")?.value}`,
      Cookie: `cartToken=${cartToken}`,
    },
    next: { revalidate: 600, tags: ["get-product"] },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getCategories = async (): Promise<Category[]> => {
  return await fetch("http://localhost:3001/categories", {
    next: { revalidate: 600 },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getLanguages = async (): Promise<Language[]> => {
  return await fetch("http://localhost:3001/languages", {
    next: { revalidate: 600 },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
