import { RecoveryClient } from "./components/RecoveryClient";
import { Suspense } from "react";

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecoveryClient />
    </Suspense>
  );
}
