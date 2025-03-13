"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMeQuery } from "@/features/auth/api/auth.api";

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isError, isSuccess } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      // router.push("/private/profile");
    }
    if (isError) {
      // router.push("/public/posts");
    }
  }, [isError, isSuccess, router]);

  return <>{children}</>;
}
