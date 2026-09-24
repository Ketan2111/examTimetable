"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";

export default function AuthGate({ requiredRole, children }) {
  const router = useRouter();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let isMounted = true;

    async function checkUser() {
      try {
        const data = await apiRequest("/auth/me");

        if (!isMounted) {
          return;
        }

        if (data.user.role !== requiredRole) {
          router.replace(data.user.role === "admin" ? "/admin" : "/student");
          return;
        }

        setStatus("allowed");
      } catch (error) {
        if (isMounted) {
          router.replace("/login");
        }
      }
    }

    checkUser();

    return () => {
      isMounted = false;
    };
  }, [requiredRole, router]);

  if (status !== "allowed") {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <p className="text-sm text-slate-600">Checking access...</p>
      </main>
    );
  }

  return children;
}
