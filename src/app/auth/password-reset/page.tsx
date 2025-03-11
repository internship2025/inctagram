import { PasswordResetClient } from "./components/PasswordResetClient";
import { Suspense } from "react";

export default function NewPasswordResetPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PasswordResetClient />
    </Suspense>
  );
}
