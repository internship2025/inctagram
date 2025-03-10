"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PATH } from "@/shared/constants/app-paths";
import { Suspense } from "react";

const CallbackPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = searchParams.get("accessToken");
      const email = searchParams.get("email");

      if (accessToken && email) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("email", email);
      }
    }

    router.push(PATH.ROOT);
  }, [searchParams, router]);

  return <div></div>;
};

const CallbackPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CallbackPage />
  </Suspense>
);

export default CallbackPageWithSuspense;
