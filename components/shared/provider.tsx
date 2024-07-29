"use client";

import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";

const queryClient = new QueryClient();

export const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <NextTopLoader color="#F6285B" />
          {children}
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
};
