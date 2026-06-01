import { User } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface OctoSearchCardsProps {
  user: User | null;
}

export default function OctoSearchCards({ user }: OctoSearchCardsProps) {
  const cards = [
    {
      label: "Search GitHub",
      sub: "Keyboard first search enabled",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      ),
      action: "Search now",
      href: "/search",
    },
    {
      label: "Browse Repos",
      sub: "Find repositories by topic",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v8.25m19.5 0h-18"
          />
        </svg>
      ),
      action: "Browse",
      href: "/search?type=repositories",
    },
    {
      label: user?.login ?? "Your Profile",
      sub: user?.location ?? "GitHub Developer",
      image: user?.avatar_url,
      action: "View profile",
      href: user ? `/user/${user.login}` : "/user",
    },
    {
      label: "Statistics",
      sub: "View your GitHub stats",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
          />
        </svg>
      ),
      action: "View stats",
      href: user ? `/stats/${user.login}` : "/stats",
    },
  ];

  return (
    <div>
      <h2 className="text-head font-medium text-base mb-3">OctoSearch</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card, index) => (
          <Link
            key={index}
            href={card.href}
            className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between gap-3 hover:border-green transition-colors cursor-pointer min-h-[120px]"
          >
            <div className="flex flex-col gap-1">
              {card.image ? (
                <Image
                  src={card.image}
                  alt={card.label}
                  width={40}
                  height={40}
                  className="rounded-full mb-1"
                />
              ) : (
                <div className="w-9 h-9 bg-mini-card rounded-lg flex items-center justify-center text-p mb-1">
                  {card.icon}
                </div>
              )}
              <p className="text-head font-medium text-sm">{card.label}</p>
              <p className="text-p text-xs line-clamp-2">{card.sub}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-green">
              <span>{card.action} →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
