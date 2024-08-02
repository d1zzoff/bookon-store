"use client";

import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NextTopLoader color="#F6285B" />
        {children}
        <Toaster position="top-right" />
      </QueryClientProvider>
    </>
  );
};
