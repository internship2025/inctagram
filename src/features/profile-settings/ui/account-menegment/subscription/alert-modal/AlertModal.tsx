import { Button } from "@/shared/ui/button/button";
import { CommonNotificationModal } from "@/shared/ui/commonNotificationModal/CommonNotificationModal";

import { Modal } from "@/shared/ui/modal/modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  text: string;
};

export const AlertModal = ({ text }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const [isVal, setIsVal] = useState(true);
  function handler() {
    if (success) {
      router.replace("?tab=Account-management");
    }
    setIsVal(false);
  }

  return (
    <>
      <Modal open={isVal}>
        <CommonNotificationModal
          footerAlign="right"
          footer={<Button onClick={handler}>OK</Button>}
        >
          {text}
        </CommonNotificationModal>
      </Modal>
    </>
  );
};
