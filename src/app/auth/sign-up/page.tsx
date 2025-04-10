import { Suspense } from "react"
import { SignUpClient } from "./components"

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpClient />
    </Suspense>
  )
}
