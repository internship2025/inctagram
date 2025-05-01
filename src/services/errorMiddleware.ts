import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

type ErrorResponse = {
  status: string | number;
  data: {
    message?: string;
    error?: string;
    statusCode?: number;
  };
};

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const error = action.payload as ErrorResponse;

    if (error.status === "FETCH_ERROR") {
      toast.error("Нет соединения с сервером. Проверьте интернет.");
    } else if (error.status === 401) {
      toast.error("Вы не авторизованы.");
    } else if (error.status === 403) {
      toast.error("Нет доступа.");
    } else if (error.status === 404) {
      toast.error("Ресурс не найден.");
    } else {
      toast.error("Что-то пошло не так.");
    }
  }

  return next(action);
};
