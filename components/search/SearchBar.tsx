"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";

const filterOptions = ["Repositories", "Users", "Code", "Issues"];

interface SearchBarProps {
  defaultValue?: string;
  defaultFilter?: string;
}

export default function SearchBar({
  defaultValue = "",
  defaultFilter = "Repositories",
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const [filter, setFilter] = useState(defaultFilter);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { data: session } = useSession();
  // Keyboard shortcut — "/" tugmasi
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

 const handleSearch = async (e: React.FormEvent) => {
   e.preventDefault();
   if (!query.trim()) return;

   if (session) {
     const userId = session.user?.email ?? session.user?.name ?? "";
     const { data: existing } = await supabase
       .from("search_history")
       .select("id")
       .eq("user_id", userId)
       .eq("query", query.trim())
       .eq("type", filter.toLowerCase())
       .maybeSingle();

     if (existing) {
       await supabase
         .from("search_history")
         .update({ searched_at: new Date().toISOString() })
         .eq("id", existing.id);
     } else {
       await supabase.from("search_history").insert({
         user_id: userId,
         query: query.trim(),
         type: filter.toLowerCase(),
         searched_at: new Date().toISOString(),
       });
     }
   }

   router.push(
     `/results?q=${encodeURIComponent(query.trim())}&type=${filter.toLowerCase()}`,
   );
 };

  return (
    <div className="w-full">
      {/* Filter tabs */}
      <div className="flex gap-1 mb-3">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              filter === option
                ? "bg-green text-white"
                : "text-p hover:bg-mini-card"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Search input */}
      <form onSubmit={handleSearch}>
        <div
          className={`flex items-center gap-3 bg-card border rounded-xl px-4 py-3 transition-all ${
            focused
              ? "border-green shadow-input-focus"
              : "border-border shadow-input"
          }`}
        >
          {/* Search icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-5 h-5 text-p shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={`Search GitHub ${filter.toLowerCase()}...`}
            className="flex-1 bg-transparent text-head text-sm placeholder:text-p outline-none"
          />

          {/* Keyboard shortcut hint */}
          {!focused && !query && (
            <kbd className="hidden md:flex items-center gap-1 px-2 py-1 text-xs text-p border border-border rounded-lg">
              /
            </kbd>
          )}

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-p hover:text-head transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Search button */}
          <button
            type="submit"
            className="bg-green hover:opacity-90 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-opacity shrink-0"
          >
            Qidirish
          </button>
        </div>
      </form>
    </div>
  );
}
