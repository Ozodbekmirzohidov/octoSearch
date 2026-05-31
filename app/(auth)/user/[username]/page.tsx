import { getUserProfile, getUserRepos } from "@/lib/github";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileRepos from "@/components/profile/ProfileRepos";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
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
      <div>
        <h1 className="text-head font-medium text-xl mb-1">User Profile</h1>
        <p className="text-p text-sm">@{username} profili</p>
      </div>

      {/* Profile info */}
      <ProfileHeader user={user} />

      {/* Repos */}
      <ProfileRepos repos={repos} />
    </div>
  );
}
