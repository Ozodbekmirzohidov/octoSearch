import { searchRepositories, searchUsers } from "@/lib/github";
import RepoCard from "@/components/search/RepoCard";
import UserCard from "@/components/search/UserCard";
import SearchBar from "@/components/search/SearchBar";
import { Repository, User } from "@/lib/types";
import Link from "next/link";
import SaveButton from "@/components/search/SaveButton";

interface ResultsPageProps {
  searchParams: Promise<{ q?: string; type?: string; page?: string }>;
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const { q, type, page } = await searchParams;
   const query = q ?? "";
   const searchType = type ?? "repositories";
   const pageNum = Number(page ?? 1);

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-head font-medium">Qidiruv so&apos;rovi kiritilmadi</p>
        <p className="text-p text-sm">
          Iltimos, qidiruv maydoniga biror narsa yozing
        </p>
      </div>
    );
  }

  let data: { total_count: number; items: Repository[] | User[] } | null = null;
  let error = "";

  try {
    if (searchType === "users") {
      data = await searchUsers(query, pageNum);
    } else {
      data = await searchRepositories(query, pageNum);
    }
  } catch {
    error = "GitHub API dan ma'lumot olishda xato yuz berdi";
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Search bar */}
      <SearchBar
        defaultValue={query}
        defaultFilter={searchType === "users" ? "Users" : "Repositories"}
      />

      {/* Results count */}
      {data && (
        <div className="flex items-center justify-between">
          <p className="text-p text-sm">
            <span className="text-head font-medium">
              {data.total_count.toLocaleString()}
            </span>{" "}
            ta natija topildi —{" "}
            <span className="text-green font-medium">{`"${query}"`}</span>
          </p>
          <p className="text-p text-xs">Sahifa {pageNum}</p>
          <SaveButton query={query} type={searchType} />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-card border border-red-500/30 rounded-xl p-4 text-center">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Results */}
      {data && data.items.length > 0 && (
        <div className="flex flex-col gap-3">
          {searchType === "users"
            ? (data.items as User[]).map((user) => (
                <UserCard key={user.id} user={user} />
              ))
            : (data.items as Repository[]).map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
        </div>
      )}

      {/* Empty */}
      {data && data.items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 bg-mini-card rounded-2xl flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-8 h-8 text-p"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <p className="text-head font-medium">Hech narsa topilmadi</p>
          <p className="text-p text-sm">
            &quot;{query}&quot; uchun natija yo&apos;q
          </p>
        </div>
      )}

      {/* Pagination */}
      {data && data.total_count > 10 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {pageNum > 1 && (
            <Link
              href={`/results?q=${encodeURIComponent(query)}&type=${searchType}&page=${pageNum - 1}`}
              className="px-4 py-2 text-sm bg-card border border-border rounded-lg text-p hover:border-green hover:text-green transition-colors"
            >
              ← Oldingi
            </Link>
          )}
          <span className="px-4 py-2 text-sm bg-green text-white rounded-lg">
            {pageNum}
          </span>
          {data.total_count > pageNum * 10 && (
            <Link
              href={`/results?q=${encodeURIComponent(query)}&type=${searchType}&page=${pageNum + 1}`}
              className="px-4 py-2 text-sm bg-card border border-border rounded-lg text-p hover:border-green hover:text-green transition-colors"
            >
              Keyingi →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
