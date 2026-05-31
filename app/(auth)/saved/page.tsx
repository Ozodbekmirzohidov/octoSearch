import { getServerSession } from "next-auth";
import SavedList from "@/components/saved/SavedList";
import Link from "next/link";

export default async function SavedPage() {
  const session = await getServerSession();

  if (!session) {
    return (
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
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </div>
        <p className="text-head font-medium">Login kerak</p>
        <p className="text-p text-sm text-center max-w-xs">
          Saqlangan qidiruvlarni ko&#39;rish uchun GitHub bilan kiring
        </p>
        <Link
          href="/"
          className="bg-green text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Kirish
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-head font-medium text-xl mb-1">Saved Searches</h1>
        <p className="text-p text-sm">Saqlangan qidiruvlaringiz</p>
      </div>
      <SavedList userId={session.user?.email ?? session.user?.name ?? ""} />
    </div>
  );
}
