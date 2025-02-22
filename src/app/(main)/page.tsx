"use client";

import { useMeQuery } from "@/features/auth/api/auth.api";

export default function Home() {
  const { data, error, isLoading } = useMeQuery();

  if (isLoading) {
    return; // there'll be some loader
  }

  if (error || !data) {
    return; // there'll be public page
  }

  return; //there'll be home page
}
