import SearchBar from "@/components/search/SearchBar";

interface SearchPageProps {
  searchParams: Promise<{ type?: string; q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { type, q } = await searchParams;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-head font-medium text-xl mb-1">Search</h1>
        <p className="text-p text-sm">
          GitHub repositories, users va kod qidiring
        </p>
      </div>

      <SearchBar
        defaultValue={q ?? ""}
        defaultFilter={type === "users" ? "Users" : "Repositories"}
      />

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
        <div className="text-center">
          <p className="text-head font-medium mb-1">Qidiruvni boshlang</p>
          <p className="text-p text-sm max-w-xs">
            Repository, user yoki kod qidirish uchun yuqoridagi qidiruv
            maydoniga yozing
          </p>
        </div>
        <kbd className="flex items-center gap-2 px-3 py-2 text-sm text-p border border-border rounded-lg bg-card">
          <span>/</span>
          <span>tugmasini bosing</span>
        </kbd>
      </div>
    </div>
  );
}
