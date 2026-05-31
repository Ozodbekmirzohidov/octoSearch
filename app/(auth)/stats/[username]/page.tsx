import Image from "next/image";
import { getUserProfile, getUserRepos } from "@/lib/github";
import StatsOverview from "@/components/stats/StatsOverview";
import { notFound } from "next/navigation";
import StatsCharts from "@/components/stats/StatsCharts";


interface StatsPageProps {
  params: Promise<{ username: string }>;
}

export default async function StatsPage({ params }: StatsPageProps) {
  const { username } = await params;

  let user = null;
  let repos = [];

  try {
    user = await getUserProfile(username);
    repos = await getUserRepos(username);
  } catch {
    notFound();
  }

  if (!user) notFound();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Image
          width={40}
          height={40}
          src={user.avatar_url}
          alt={user.login}
            className="w-10 h-10 rounded-full"
        />
        <div>
          <h1 className="text-head font-medium text-xl">
            {user.name ?? user.login}
          </h1>
          <p className="text-p text-sm">@{username} statistikasi</p>
        </div>
      </div>

      {/* Stats overview */}
      <StatsOverview user={user} repos={repos} />
      <StatsCharts repos={repos} />
    </div>
  );
}
