import { User } from "@/lib/types";
import Image from "next/image";

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Chap — User info */}
      <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4">
        {/* Avatar + username */}
        <div className="flex items-center gap-3">
          <Image
            src={user.avatar_url}
            alt={user.login}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <p className="text-head font-medium text-sm">@{user.login}</p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-green hover:underline"
            >
              change avatar
            </a>
          </div>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xs text-p mb-1">Display name</p>
            <div className="bg-mini-card border border-border rounded-lg px-3 py-2 text-sm text-head">
              {user.name ?? user.login}
            </div>
          </div>

          {user.email && (
            <div>
              <p className="text-xs text-p mb-1">Public email</p>
              <div className="bg-mini-card border border-border rounded-lg px-3 py-2 text-sm text-head">
                {user.email}
              </div>
            </div>
          )}

          {user.blog && (
            <div>
              <p className="text-xs text-p mb-1">Website</p>
              <div className="bg-mini-card border border-border rounded-lg px-3 py-2 text-sm text-green truncate">
                {user.blog}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {user.created_at && (
              <div>
                <p className="text-xs text-p mb-1">Joined</p>
                <div className="bg-mini-card border border-border rounded-lg px-3 py-2 text-sm text-head">
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            )}
            {user.location && (
              <div>
                <p className="text-xs text-p mb-1">Location</p>
                <div className="bg-mini-card border border-border rounded-lg px-3 py-2 text-sm text-head truncate">
                  {user.location}
                </div>
              </div>
            )}
          </div>

          {user.bio && (
            <div>
              <p className="text-xs text-p mb-1">Bio</p>
              <div className="bg-mini-card border border-border rounded-lg px-3 py-2 text-sm text-head">
                {user.bio}
              </div>
            </div>
          )}

          {user.company && (
            <div>
              <p className="text-xs text-p mb-1">Company</p>
              <div className="bg-mini-card border border-border rounded-lg px-3 py-2 text-sm text-head">
                {user.company}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* O'ng — Actions + Quick Stats */}
      <div className="flex flex-col gap-4">
        {/* Actions */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-head font-medium text-sm mb-3">Actions</h3>
          <div className="flex flex-col gap-1">
            {[
              {
                label: "View on GitHub",
                action: "Open",
                href: user.html_url,
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                ),
              },
              {
                label: "Follow",
                action: "Toggle",
                href: user.html_url,
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                ),
              },
              {
                label: "Starred repos",
                action: "View",
                href: `${user.html_url}?tab=stars`,
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                ),
              },
              {
                label: "Browse repositories",
                action: "Browse",
                href: `${user.html_url}?tab=repositories`,
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v8.25m19.5 0h-18"
                    />
                  </svg>
                ),
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-mini-card transition-colors group"
              >
                <div className="flex items-center gap-3 text-p group-hover:text-head transition-colors">
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </div>
                <span className="text-xs text-green">{item.action}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-head font-medium text-sm mb-3">Quick Stats</h3>
          <div className="flex flex-col gap-1">
            {[
              {
                label: "Repos",
                value: user.public_repos,
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v8.25m19.5 0h-18"
                    />
                  </svg>
                ),
              },
              {
                label: "Followers",
                value: user.followers,
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                ),
              },
              {
                label: "Following",
                value: user.following,
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                    />
                  </svg>
                ),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-mini-card transition-colors"
              >
                <div className="flex items-center gap-3 text-p">
                  {stat.icon}
                  <span className="text-sm">{stat.label}</span>
                </div>
                <span className="text-sm font-medium text-head">
                  {stat.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
