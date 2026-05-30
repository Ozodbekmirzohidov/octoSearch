"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components";
export default function WelcomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-green rounded-2xl flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-head">
            Octo<span className="text-green">Search</span>
          </h1>
        </div>

        <p className="text-sm md:text-base text-p text-center max-w-xs md:max-w-sm leading-relaxed">
          GitHub repositories va developerlarni qidirish uchun kuchli vosita
        </p>
        <div className="w-10 h-px bg-border" />
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => signIn("github", { callbackUrl: "/home" })}
            className="w-full flex items-center justify-center gap-2 bg-green hover:opacity-90 text-white text-sm font-medium py-3 px-6 rounded-xl transition-opacity cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub bilan kirish
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-p">yoki</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button
            onClick={() => router.push("/home")}
            className="w-full flex items-center justify-center gap-2 bg-card hover:bg-mini-card border border-border text-p text-sm font-medium py-3 px-6 rounded-xl transition-colors cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            Mehmon sifatida kirish
          </button>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <div className="flex items-center gap-1.5 text-xs text-p">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth={2}
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
            Qidirish
          </div>
          <div className="flex items-center gap-1.5 text-xs text-p">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth={2}
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
            Profillar
          </div>
          <div className="flex items-center gap-1.5 text-xs text-p opacity-40">
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
            Sevimlilar
          </div>
          <div className="flex items-center gap-1.5 text-xs text-p opacity-40">
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
            Tarix
          </div>
        </div>
        <p className="text-xs text-p opacity-50 text-center max-w-xs">
          Mehmon rejimida sevimlilar va tarix saqlanmaydi
        </p>
      </div>
    </main>
  );
}
