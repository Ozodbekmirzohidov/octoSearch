"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface RecentSearch {
  id: string;
  query: string;
  type: string;
  searched_at: string;
}

export function RecentList({ userId }: { userId: string }) {
  const [items, setItems] = useState<RecentSearch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecent() {
      const { data } = await supabase
        .from("search_history")
        .select("id, query, type, searched_at")
        .eq("user_id", userId)
        .order("searched_at", { ascending: false });
      if (data) setItems(data);
      setLoading(false);
    }
    fetchRecent();
  }, [userId]);

  async function handleDelete(id: string) {
    await supabase.from("search_history").delete().eq("id", id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  async function handleClearAll() {
    await supabase.from("search_history").delete().eq("user_id", userId);
    setItems([]);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
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
        <p className="text-head font-medium">{"Tarix bo'sh"}</p>
        <p className="text-p text-sm">Hali hech narsa qidirmadingiz</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-p text-sm">{items.length} ta qidiruv</span>
        <button
          onClick={handleClearAll}
          className="text-xs text-p hover:text-red-500 transition-colors"
        >
          {"Hammasini o'chirish"}
        </button>
      </div>

      {/* List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <span className="text-sm font-medium text-head">Qidiruv tarixi</span>
          <span className="text-xs text-p">{items.length} ta</span>
        </div>

        {items.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-mini-card transition-colors ${
              index !== items.length - 1 ? "border-b border-border" : ""
            }`}
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
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <Link
              href={`/results?q=${encodeURIComponent(item.query)}&type=${item.type}`}
              className="flex-1 min-w-0"
            >
              <p className="text-head text-sm truncate">{item.query}</p>
              <p className="text-p text-xs">
                {item.type} ·{" "}
                {new Date(item.searched_at).toLocaleDateString("uz-UZ")}
              </p>
            </Link>

            <button
              onClick={() => handleDelete(item.id)}
              className="text-p hover:text-red-500 transition-colors shrink-0"
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
