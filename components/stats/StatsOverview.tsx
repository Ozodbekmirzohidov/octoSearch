import { User } from "@/lib/types";
import { Repository } from "@/lib/types";

interface StatsOverviewProps {
  user: User;
  repos: Repository[];
}

function StatCard({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
      <div className="w-9 h-9 bg-mini-card rounded-lg flex items-center justify-center text-p">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-semibold text-head">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        <p className="text-sm text-head">{label}</p>
        {sub && <p className="text-xs text-p mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function StatsOverview({ user, repos }: StatsOverviewProps) {
  const totalStars = repos.reduce(
    (acc, repo) => acc + repo.stargazers_count,
    0,
  );
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
  const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))];
  const mostStarred = repos.sort(
    (a, b) => b.stargazers_count - a.stargazers_count,
  )[0];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-head font-medium text-base">Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Public Repos"
          value={user.public_repos}
          sub="GitHub da"
          icon={
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
          }
        />
        <StatCard
          label="Total Stars"
          value={totalStars}
          sub="Barcha repolarda"
          icon={
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
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          }
        />
        <StatCard
          label="Total Forks"
          value={totalForks}
          sub="Barcha repolarda"
          icon={
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
                d="M7.5 21 3 12m0 0 4.5-9M3 12h13.5m0 0L12 3m4.5 9-4.5 9"
              />
            </svg>
          }
        />
        <StatCard
          label="Followers"
          value={user.followers}
          sub={`Following: ${user.following}`}
          icon={
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
          }
        />
      </div>

      {/* Languages + Most starred */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Languages */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-head font-medium text-sm mb-3">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {languages.length > 0 ? (
              languages.map((lang) => (
                <span
                  key={lang}
                  className="text-xs px-3 py-1 bg-mini-card border border-border rounded-full text-p"
                >
                  {lang}
                </span>
              ))
            ) : (
              <p className="text-p text-sm">Ma&#39;lumot yo&#39;q</p>
            )}
          </div>
        </div>

        {/* Most starred repo */}
        {mostStarred && (
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="text-head font-medium text-sm mb-3">Most Starred</h3>
            <a
              href={mostStarred.html_url}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col gap-1 hover:opacity-80 transition-opacity"
            >
              <p className="text-green text-sm font-medium">
                {mostStarred.name}
              </p>
              {mostStarred.description && (
                <p className="text-p text-xs line-clamp-2">
                  {mostStarred.description}
                </p>
              )}
              <div className="flex items-center gap-3 mt-1 text-xs text-p">
                <span>⭐ {mostStarred.stargazers_count.toLocaleString()}</span>
                <span>🍴 {mostStarred.forks_count.toLocaleString()}</span>
                {mostStarred.language && <span>{mostStarred.language}</span>}
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
