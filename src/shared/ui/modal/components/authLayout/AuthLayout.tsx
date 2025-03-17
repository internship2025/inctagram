"use client"

import { useRouter } from "next/navigation"
import * as Dialog from "@radix-ui/react-dialog"
import styles from "@/shared/ui/modal/modal.module.css"
import { Typography } from "@/shared/ui/typography/typography"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
}

export const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  const router = useRouter()

  return (
    <Dialog.Root open={true} onOpenChange={() => router.back()}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.commonStyles}>
          <Typography variant="h1" className={styles.title}>
            {title}
          </Typography>
          <div className={styles.indent}>{children}</div>
          <Dialog.Close asChild>
            <button className={styles.iconButton} aria-label="Close">
              ×
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
