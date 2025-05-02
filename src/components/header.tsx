"use client";

import Link from "next/link";
import { CartWidget } from "./cart-widget";
import Image from "next/image";
import { SearchForm } from "./search-form";

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link href={"/"} className="text-2xl font-extrabold">
          <span className="text-emerald-500">Dev</span>
          <span className="text-violet-500">Store</span>
        </Link>

        <SearchForm />
      </div>
      <div className="flex items-center gap-4">
        <CartWidget />

        <div className="w-px h-4 bg-zinc-700" />

        <Link href={"/"} className="flex items-center gap-2 hover:underline">
          <span className="text-sm">Account</span>
          <Image
            className="rounded-full h-6 w-6"
            src="https://github.com/ciumauri.png"
            alt="User"
            width={24}
            height={24}
            loading="lazy"
          />
        </Link>
      </div>
    </header>
  );
}
