"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";

interface SaveButtonProps {
  query: string;
  type: string;
}

export default function SaveButton({ query, type }: SaveButtonProps) {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!session) return null;

  async function handleSave() {
    setLoading(true);
    await supabase.from("saved_searches").insert({
      user_id: session?.user?.email ?? session?.user?.name ?? "",
      query,
      type,
    });
    setSaved(true);
    setLoading(false);
  }

  return (
    <button
      onClick={handleSave}
      disabled={saved || loading}
      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
        saved
          ? "border-green text-green bg-green/10"
          : "border-border text-p hover:border-green hover:text-green"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
      </svg>
      {saved ? "Saqlandi" : loading ? "..." : "Saqlash"}
    </button>
  );
}
