"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export const GlobalErrorHandler = () => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Global error:', event.error);
        }
        toast.error(event.error?.message || 'Неизвестная ошибка');
      };
      
    const handleRejection = (event: PromiseRejectionEvent) => {
      toast.error(event.reason?.message || "Unexpected promise rejection");
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return null;
};