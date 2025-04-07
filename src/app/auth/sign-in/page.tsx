import { Suspense } from "react"
import { SignInClient } from "./components"

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInClient />
    </Suspense>
  )
}
