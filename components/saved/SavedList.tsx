"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface SavedSearch {
  id: string;
  query: string;
  type: string;
  saved_at: string;
}

interface SavedListProps {
  userId: string;
}

export default function SavedList({ userId }: SavedListProps) {
  const [saved, setSaved] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSaved() {
      const { data } = await supabase
        .from("saved_searches")
        .select("*")
        .eq("user_id", userId)
        .order("saved_at", { ascending: false });

      setSaved(data ?? []);
      setLoading(false);
    }
    fetchSaved();
  }, [userId]);

  async function handleDelete(id: string) {
    await supabase.from("saved_searches").delete().eq("id", id);
    setSaved((prev) => prev.filter((s) => s.id !== id));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (saved.length === 0) {
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
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
        </div>
        <p className="text-head font-medium">Saqlangan qidiruvlar yo&#39;q</p>
        <p className="text-p text-sm text-center max-w-xs">
          Qidiruv natijalarida yulduzcha bosib qidiruvlarni saqlang
        </p>
        <Link
          href="/search"
          className="bg-green text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Qidiruvga o&#39;tish
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <h3 className="text-head font-medium text-sm">Saqlangan qidiruvlar</h3>
        <span className="text-xs text-p">{saved.length} ta</span>
      </div>

      <div className="divide-y divide-border">
        {saved.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between px-5 py-3 hover:bg-mini-card transition-colors"
          >
            <Link
              href={`/results?q=${encodeURIComponent(item.query)}&type=${item.type}`}
              className="flex items-center gap-3 flex-1 min-w-0"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-4 h-4 text-p shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <div className="min-w-0">
                <p className="text-sm text-head truncate hover:text-green transition-colors">
                  {item.query}
                </p>
                <p className="text-xs text-p">
                  {item.type} ·{" "}
                  {new Date(item.saved_at).toLocaleDateString("uz-UZ")}
                </p>
              </div>
            </Link>

            <button
              onClick={() => handleDelete(item.id)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-mini-card text-p hover:text-red-400 transition-colors ml-2 shrink-0"
            >
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
