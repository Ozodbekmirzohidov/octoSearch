import { Repository } from "@/lib/types";

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Rust: "#dea584",
  CSS: "#563d7c",
  Python: "#3572A5",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  Ruby: "#701516",
  Swift: "#f05138",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatNumber(num: number) {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
}

interface RepoCardProps {
  repo: Repository;
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="block bg-card border border-border rounded-xl p-4 hover:border-green transition-all group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            className="w-5 h-5 rounded-full shrink-0"
          />
          <span className="text-p text-sm truncate">{repo.owner.login}</span>
          <span className="text-p text-sm">/</span>
          <span className="text-head text-sm font-medium truncate group-hover:text-green transition-colors">
            {repo.name}
          </span>
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${
            repo.visibility === "public"
              ? "border-green text-green"
              : "border-border text-p"
          }`}
        >
          {repo.visibility}
        </span>
      </div>

      {repo.description && (
        <p className="text-p text-sm line-clamp-2 mb-3">{repo.description}</p>
      )}

      {repo.topics?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="text-xs px-2 py-0.5 bg-mini-card text-p rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 text-xs text-p">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: languageColors[repo.language] ?? "#8b949e" }}
            />
            {repo.language}
          </div>
        )}
        <div className="flex items-center gap-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-3.5 h-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          {formatNumber(repo.stargazers_count)}
        </div>
        <div className="flex items-center gap-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-3.5 h-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 21 3 12m0 0 4.5-9M3 12h13.5m0 0L12 3m4.5 9-4.5 9"
            />
          </svg>
          {formatNumber(repo.forks_count)}
        </div>
        <span className="ml-auto">Updated {formatDate(repo.updated_at)}</span>
      </div>
    </a>
  );
}
