"use server";

import { Container } from "./container";
import { SearchInput } from "./search-input";
import { AuthButton } from "./auth-button";
import { getUser } from "@/lib/actions/users";
import { Logo } from "./logo";
import { Cart } from "./cart";

export const Header = async () => {
  const user = await getUser();

  return (
    <header className="w-[100vw] bg-light border-b border-grey-200 fixed z-[10] top-0">
      <Container className="flex justify-between py-[30px] items-center">
        <div className="flex items-center gap-10 flex-grow-1 w-full">
          <Logo />
          <SearchInput />
        </div>
        <div className="flex items-center gap-[10px]">
          <AuthButton user={user} />
          <Cart />
        </div>
      </Container>
    </header>
  );
};
