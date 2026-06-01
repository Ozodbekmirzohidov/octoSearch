import { User } from "@/lib/types";
import { Repository } from "@/lib/types";

interface UserProfileCardsProps {
  user: User | null;
  repos: Repository[];
}

export default function UserProfileCards({
  user,
  repos,
}: UserProfileCardsProps) {
  const totalStars = repos.reduce(
    (acc, repo) => acc + repo.stargazers_count,
    0,
  );
  const mostStarred = [...repos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count,
  )[0];

  const cards = [
    {
      label: "Repositories",
      value: user?.public_repos ?? 0,
      sub: "Updated recently",
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
    },
    {
      label: "Most Starred",
      value: mostStarred ? `${mostStarred.stargazers_count} stars` : "N/A",
      sub: mostStarred?.language ?? "No language",
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
            d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
          />
        </svg>
      ),
    },
    {
      label: "Followers",
      value: user?.followers ?? 0,
      sub: `Following ${user?.following ?? 0}`,
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
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
      ),
    },
    {
      label: "Bio",
      value: user?.bio ? user.bio.slice(0, 20) + "..." : "No bio",
      sub: user?.location ?? "No location",
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
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-head font-medium text-base mb-3">
        {user ? `${user.name ?? user.login} profili` : "User profile"}
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 hover:border-green transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 bg-mini-card rounded-lg flex items-center justify-center text-p">
              {card.icon}
            </div>
            <div>
              <p className="text-head font-medium text-sm">{card.label}</p>
              <p className="text-green text-sm">
                {typeof card.value === "number"
                  ? card.value.toLocaleString()
                  : card.value}
              </p>
            </div>
            <p className="text-p text-xs">{card.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
