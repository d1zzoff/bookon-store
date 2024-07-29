"use client";

import { getSearchProducts } from "@/lib/actions/products";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const SearchInput = () => {
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data: products } = useSWR(debouncedSearch, getSearchProducts);

  useEffect(() => {
    if (focused) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [focused]);

  return (
    <>
      {focused && (
        <div
          className="fixed top-0 left-0 bottom-0 right-0 bg-dark/70 z-[30] animate-bg-on"
          onClick={() => setFocused(false)}
        />
      )}

      <div className="relative flex flex-1 justify-between h-11 z-30 gap-[20px]">
        <div className="flex rounded-[15px] flex-1 justify-between relative h-[45px] z-[40]">
          <Search
            strokeWidth={2}
            className="absolute top-1/2 translate-y-[-50%] left-[15px] h-5 w-5 text-grey-400"
          />
          <input
            type="text"
            className="rounded-[15px] outline-none w-full bg-grey-100 pl-[45px] max-w-[600px]"
            placeholder="Поиск..."
            onFocus={() => setFocused(true)}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        {focused && products && products.length > 0 && (
          <div className="mt-[50px] absolute rounded-[15px] bg-light w-full z-30 max-w-[600px] py-[12px] animate-slide-down">
            {products &&
              products?.length > 0 &&
              products.map((item, i) => (
                <button
                  className="px-[10px] py-[5px] w-full flex gap-[10px] items-center transition-color duration-200 hover:bg-accent/15"
                  key={i}
                >
                  <img
                    src={item.images[0]}
                    className="object-contain w-[45px] h-[45px]"
                  />
                  <p>{item?.title}</p>
                </button>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
