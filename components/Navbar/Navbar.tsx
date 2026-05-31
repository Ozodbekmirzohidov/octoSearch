"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { useSession, signOut } from "next-auth/react";

const pageNames: Record<string, string> = {
  "/home": "Home",
  "/search": "Search",
  "/results": "Search Results",
  "/user": "Profile Card",
  "/stats": "Statistics",
  "/saved": "Saved Searches",
};

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const pageName =
    Object.entries(pageNames).find(([key]) => pathname.startsWith(key))?.[1] ??
    "OctoSearch";
  
  return (
    <nav className="flex items-center justify-between w-full border-b border-border bg-card shadow-navbar py-3 px-4 md:px-6">
      <div className="flex items-center gap-2">
        <h2 className="text-head font-medium text-lg">{pageName}</h2>
        
      </div>

      <div className="flex-1 max-w-xs md:max-w-sm mx-4">
        <div className="relative flex items-center">
          <Image
            className="absolute left-3"
            src="/assets/img/svg/search.svg"
            alt="search"
            width={16}
            height={16}
          />
          <input
            type="text"
            className="w-full bg-background text-head text-sm placeholder:text-p pl-9 pr-4 py-2 border border-border rounded-xl outline-none shadow-input focus:shadow-input-focus focus:border-green transition-all"
            placeholder="Search GitHub users..."
          />
        </div>
      </div>

      <div>
        <ul className="flex items-center gap-1">
          <li className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-xl hover:bg-mini-card transition-colors text-p">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
              <path d="M12 19l0 .01" />
            </svg>
          </li>

          <li className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-xl hover:bg-mini-card transition-colors text-p">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
              <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
            </svg>
          </li>

          <li className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-xl hover:bg-mini-card transition-colors text-p">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" />
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            </svg>
          </li>

          <li>
            <ThemeToggle />
          </li>
          <li className="ml-1 cursor-pointer w-9 h-9 flex items-center justify-center border border-border rounded-full overflow-hidden hover:border-green transition-colors">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="avatar"
                width={36}
                height={36}
                className="rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-p"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              </svg>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
