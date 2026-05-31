import { mockRepos } from "@/lib/mockData";

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Rust: "#dea584",
  CSS: "#563d7c",
  Python: "#3572A5",
  Go: "#00ADD8",
};

export default function LatestRepos() {
  return (
    <div>
      <h2 className="text-head font-medium text-base mb-3">Latest repositories</h2>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-5 px-4 py-2 border-b border-border">
          <p className="text-xs text-p col-span-2">Repo</p>
          <p className="text-xs text-p">Stars</p>
          <p className="text-xs text-p">Visibility</p>
          <p className="text-xs text-p">Updated</p>
        </div>

        {/* Rows */}
        {mockRepos.map((repo) => (
          <div
            key={repo.id}
            className="grid grid-cols-5 px-4 py-3 border-b border-border last:border-0 hover:bg-mini-card transition-colors"
          >
            {/* Repo name */}
            <div className="col-span-2 flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: languageColors[repo.language] ?? "#8b949e" }}
              />
              <a
                href={repo.html_url}
                target="_blank"
                className="text-sm text-head hover:text-green transition-colors truncate"
              >
                {repo.name}
              </a>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 text-p">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              <span className="text-xs text-p">
                {repo.stargazers_count >= 1000
                  ? `${(repo.stargazers_count / 1000).toFixed(1)}k`
                  : repo.stargazers_count}
              </span>
            </div>

            {/* Visibility */}
            <div className="flex items-center">
              <span className={`text-xs px-2 py-0.5 rounded-full border ${
                repo.visibility === "public"
                  ? "border-green text-green"
                  : "border-border text-p"
              }`}>
                {repo.visibility}
              </span>
            </div>

            {/* Updated */}
            <div className="flex items-center">
              <span className="text-xs text-p">
                {new Date(repo.updated_at).toLocaleDateString("uz-UZ", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}