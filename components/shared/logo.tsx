import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href={"/"}
      className="flex-shrink-0 text-[36px] font-black text-accent"
    >
      <span className="text-dark">Book</span>On
    </Link>
  );
};
