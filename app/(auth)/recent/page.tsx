import { getServerSession } from "next-auth";
import { RecentList } from "@/components";
import Link from "next/link";

export default async function RecentPage() {
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
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <p className="text-head font-medium">Login kerak</p>
        <p className="text-p text-sm text-center max-w-xs">
          Qidiruv tarixini ko&#39;rish uchun GitHub bilan kiring
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
        <h1 className="text-head font-medium text-xl mb-1">Recent Searches</h1>
        <p className="text-p text-sm">Oxirgi qidiruvlaringiz</p>
      </div>
      <RecentList userId={session.user?.email ?? session.user?.name ?? ""} />
    </div>
  );
}
