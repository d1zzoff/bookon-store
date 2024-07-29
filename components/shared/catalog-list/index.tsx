"use server";

import { getProducts } from "@/lib/actions/products";
import qs from "qs";
import { ProductItem } from "./product-item";
import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  searchParams: any;
}

export const CatalogList: React.FC<Props> = async ({
  className,
  searchParams,
}) => {
  const products = await getProducts(
    qs.stringify(searchParams, { skipNulls: true, arrayFormat: "comma" })
  );

  return (
    <div className={cn("w-full flex-grow-1", className)}>
      <h1>Каталог книг</h1>
      <p className="mb-[20px]">
        По вашему запросу найдено {products?.length || 0} товар(ов/а)
      </p>
      <div className="flex gap-[30px] w-full flex-wrap">
        {products?.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
