import { mockUser } from "@/lib/mockData";

const cards = [
  {
    label: "Search GitHub username",
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
    action: "Selected user profile",
    actionIcon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    ),
  },
  {
    label: "Verified GitHub account",
    sub: "Open-source maintainer and front end engineer.",
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
          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
        />
      </svg>
    ),
    action: "View on GitHub",
    actionIcon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6h12v12"
        />
      </svg>
    ),
  },
  {
    label: mockUser.login,
    sub: mockUser.location ?? "",
    image: mockUser.avatar_url,
    action: "avatar-large.png",
    actionIcon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    ),
  },
  {
    label: "@dev_user",
    sub: "San Francisco, CA",
    action: "Follow",
    actionIcon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v8.25m19.5 0h-18"
        />
      </svg>
    ),
  },
];

export default function OctoSearchCards() {
  return (
    <div>
      <h2 className="text-head font-medium text-base mb-3">OctoSearch</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between gap-3 hover:border-green transition-colors cursor-pointer min-h-[120px]"
          >
            <div className="flex flex-col gap-1">
              {card.image ? (
                <img
                  src={card.image}
                  alt={card.label}
                  className="w-10 h-10 rounded-full mb-1"
                />
              ) : (
                <div className="w-9 h-9 bg-mini-card rounded-lg flex items-center justify-center text-p mb-1">
                  {card.icon}
                </div>
              )}
              <p className="text-head font-medium text-sm">{card.label}</p>
              <p className="text-p text-xs line-clamp-2">{card.sub}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-p">
              {card.actionIcon}
              <span>{card.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
