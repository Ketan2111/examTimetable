"use client";

import { useRouter } from "next/navigation";

import { apiRequest } from "@/lib/api";

export default function DashboardHeader({ title }) {
  const router = useRouter();

  async function handleLogout() {
    await apiRequest("/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-xl font-semibold text-ink">{title}</h1>
      <button
        type="button"
        onClick={handleLogout}
        className="w-fit rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Logout
      </button>
    </header>
  );
}
