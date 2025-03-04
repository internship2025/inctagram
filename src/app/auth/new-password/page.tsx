'use client';

import { useSearchParams, redirect } from 'next/navigation';
import { PATH } from '@/shared/constants/app-paths';
import { CreateNewPasswordFormModule } from '@/shared/ui/modal/components/CreateNewPasswordFormModule/CreateNewPasswordFormModule';
import { useState } from 'react';

export default function NewPasswordPage() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  // Если нет кода восстановления, редиректим на страницу восстановления пароля
  if (!code) {
    redirect(PATH.PASSWORD_RECOVERY);
  }

  return (     
      <CreateNewPasswordFormModule open={open} onClose={() => setOpen(false)} />    
  );
}
