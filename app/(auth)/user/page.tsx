"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/user/${username.trim()}`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-head font-medium text-xl mb-1">Profile Card</h1>
        <p className="text-p text-sm">GitHub username kiriting</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 max-w-md">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="torvalds"
          className="flex-1 bg-card border border-border rounded-xl px-4 py-2.5 text-head text-sm placeholder:text-p outline-none focus:border-green transition-colors"
        />
        <button
          type="submit"
          className="bg-green text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
        >
          Ko&#39;rish
        </button>
      </form>
    </div>
  );
}
