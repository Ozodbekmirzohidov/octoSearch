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

function formatNumber(num: number) {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (diff === 0) return "today";
  if (diff === 1) return "yesterday";
  if (diff < 30) return `${diff}d ago`;
  if (diff < 365) return `${Math.floor(diff / 30)}mo ago`;
  return `${Math.floor(diff / 365)}y ago`;
}

interface ProfileReposProps {
  repos: Repository[];
}

export default function ProfileRepos({ repos }: ProfileReposProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <h3 className="text-head font-medium text-sm">Repositories</h3>
        <span className="text-xs text-p">{repos.length} ta</span>
      </div>

      {repos.length === 0 ? (
        <div className="py-10 text-center text-p text-sm">
          Hech qanday repository topilmadi
        </div>
      ) : (
        <div className="divide-y divide-border">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-5 py-3 hover:bg-mini-card transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                {repo.language && (
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{
                      background: languageColors[repo.language] ?? "#8b949e",
                    }}
                  />
                )}
                <div className="min-w-0">
                  <p className="text-sm text-head group-hover:text-green transition-colors truncate">
                    {repo.name}
                  </p>
                  {repo.description && (
                    <p className="text-xs text-p truncate">
                      {repo.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 ml-4">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${
                    repo.visibility === "public"
                      ? "border-green text-green"
                      : "border-border text-p"
                  }`}
                >
                  {repo.visibility}
                </span>
                <div className="flex items-center gap-1 text-xs text-p">
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
                <span className="text-xs text-p hidden md:block">
                  {formatDate(repo.updated_at)}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
