import { getServerSession } from "next-auth";
import { getUserProfile, getUserRepos } from "@/lib/github";
import UserProfileCards from "@/components/home/UserProfileCards";
import OctoSearchCards from "@/components/home/OctoSearchCards";
import LatestRepos from "@/components/home/LatestRepos";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession();

  let user = null;
  let repos = [];

  if (session?.user?.name) {
    try {
      user = await getUserProfile(session.user.name);
      repos = await getUserRepos(session.user.name);
    } catch {
      // session yo'q yoki xato
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Mehmon uchun xabar */}
      {!session && (
        <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
          <p className="text-p text-sm">
            To&#39;liq funksiyalardan foydalanish uchun GitHub bilan kiring
          </p>
          <Link
            href="/"
            className="bg-green text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Kirish
          </Link>
        </div>
      )}

      <UserProfileCards user={user} repos={repos} />
      <OctoSearchCards user={user} />
      <LatestRepos repos={repos} />
    </div>
  );
}
