"use client";

import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link href={"/"} className="text-2xl font-extrabold">
          <span className="text-emerald-500">Dev</span>
          <span className="text-violet-500">Store</span>
        </Link>

        <form className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700">
          <Search size={20} className="text-zinc-500" />

          <input
            type="text"
            placeholder="O que você procura?"
            className="flex-1 bg-transparent text-sm text-zinc-500 outline-none placeholder:text-zinc-500 focus:outline-none"
          />
          <button type="submit" className="hidden">
            <Search size={20} className="text-zinc-500" />
          </button>
        </form>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ShoppingBag size={20} className="text-zinc-500" />
          <span className="text-sm">Cart (0)</span>
        </div>

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
