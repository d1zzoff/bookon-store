"use client";

import { ShoppingCart, User } from "lucide-react";
import { Button } from "../ui";
import { Container } from "./container";
import { SearchInput } from "./search-input";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { AuthButton } from "./auth-button";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-base border-b border-grey-200">
      <Container className="flex justify-between py-[30px] items-center">
        <div className="flex items-center gap-10 flex-grow-1 w-full">
          <Link
            href={"/"}
            className="flex-shrink-0 text-[36px] font-black text-accent"
          >
            <span className="text-dark">Book</span>On
          </Link>

          <SearchInput />
        </div>

        <div className="flex items-center gap-[10px]">
          <AuthButton />

          <Button>
            <ShoppingCart strokeWidth={2} />
            100 ₴
          </Button>
        </div>
      </Container>
    </header>
  );
};
