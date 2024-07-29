"use server";

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
  price: number;
  count: number;
  category: Category;
  language: Language;
  createdAt: string;
  updatedAt: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getSearchProducts = async (search: string): Promise<Product[]> => {
  return await fetch(`http://localhost:3001/products?search=${search}`, {
    cache: "no-cache",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getProducts = async (filters: string): Promise<Product[]> => {
  return await fetch(`http://localhost:3001/products?${filters}`, {
    cache: "no-cache",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getCategories = async (): Promise<Category[]> => {
  return await fetch("http://localhost:3001/categories")
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getLanguages = async (): Promise<Language[]> => {
  return await fetch("http://localhost:3001/languages")
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
