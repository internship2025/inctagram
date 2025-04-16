"use client";

import { useRouter } from "next/navigation";
import { ErrorBoundary } from "./ErrorBoundary";
import styles from "./ErrorBoundary.module.css";
import { Button } from "@/shared/ui/button/button";

export default function ErrorBoundaryWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const fallback = (
    <div className={styles.container}>
      <h2 className={styles.title}>Что-то пошло не так 🧯</h2>
      <p className={styles.description}>Мы уже работаем над этим. Попробуйте обновить страницу.</p>
      <Button variant="secondary" onClick={() => router.push("/profile")}>
        Перейти на главную
      </Button>
    </div>
  );

  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
}
