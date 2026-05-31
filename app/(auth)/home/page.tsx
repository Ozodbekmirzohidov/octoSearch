import UserProfileCards from "@/components/home/UserProfileCards";
import OctoSearchCards from "@/components/home/OctoSearchCards";
import LatestRepos from "@/components/home/LatestRepos";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <UserProfileCards />
      <OctoSearchCards />
      <LatestRepos />
    </div>
  );
}
