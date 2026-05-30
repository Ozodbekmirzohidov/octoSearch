const GITHUB_API = "https://api.github.com";

export async function searchRepositories(query: string, page = 1) {
  const res = await fetch(
    `${GITHUB_API}/search/repositories?q=${encodeURIComponent(query)}&per_page=10&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    },
  );
  if (!res.ok) throw new Error("GitHub API xatosi");
  return res.json();
}

export async function searchUsers(query: string, page = 1) {
  const res = await fetch(
    `${GITHUB_API}/search/users?q=${encodeURIComponent(query)}&per_page=10&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    },
  );
  if (!res.ok) throw new Error("GitHub API xatosi");
  return res.json();
}

export async function getUserProfile(username: string) {
  const res = await fetch(`${GITHUB_API}/users/${username}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (!res.ok) throw new Error("Foydalanuvchi topilmadi");
  return res.json();
}

export async function getUserRepos(username: string) {
  const res = await fetch(
    `${GITHUB_API}/users/${username}/repos?sort=stars&per_page=10`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    },
  );
  if (!res.ok) throw new Error("Repolar topilmadi");
  return res.json();
}
