'use client'

import { useSearchParams, redirect } from "next/navigation"
import { PATH } from "@/shared/constants/app-paths"
import { CreateNewPasswordFormModule } from "@/shared/ui/modal/components/CreateNewPasswordFormModule/CreateNewPasswordFormModule"
import { useState } from "react"

export function RecoveryClient() {
  const [open, setOpen] = useState(true)
  const searchParams = useSearchParams()
  const code = searchParams.get("code")

  if (!code) {
    redirect(PATH.PASSWORD_RECOVERY)
  }

  return (
    <CreateNewPasswordFormModule open={open} onClose={() => setOpen(false)} />
  )
}

