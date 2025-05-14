import { Modal } from "@/shared/ui/modal/modal";
import { CommonNotificationModal } from "@/shared/ui/commonNotificationModal/CommonNotificationModal";
import { Button } from "@/shared/ui/button/button";
import { CheckBox } from "@/shared/ui/checkBox/checkBox";
import { PaymentMethod } from "../hooks/usePaymentHandlers";
import { SubscriptionType } from "../hooks/useSubscriptionType";
import { useHandleSubscription } from "../hooks/useHandleSubscription";
import { DataType } from "../hooks/useSetSubscription";

type Props = {
  isModalOpen: boolean;
  onClose: () => void;
  selectedPayment: PaymentMethod | null;
  subscriptionType: SubscriptionType;
  amount: number;
  url: string;
  handler: (data: DataType) => void;
};

export const PaymentConfirmationModal = ({
  isModalOpen,
  onClose,
  amount,
  selectedPayment,
  subscriptionType,
  url,
  handler,
}: Props) => {
  const params: DataType = {
    amount,
    paymentType: selectedPayment!,
    typeSubscription: subscriptionType,
    baseUrl: url,
  };

  const { isCheck, setIsCheck, disabled, handlerSubscription } =
    useHandleSubscription(params, handler);

  return (
    <Modal
      open={isModalOpen}
      title="Create payment"
      isClose={true}
      closeOnlyOnButton={true}
      onClose={onClose}
    >
      <CommonNotificationModal
        line={true}
        // title={<h2>Create payment</h2>}
        // line={true}
        // cross={
        //   <Image
        //     onClick={() => {
        //       setIsCheck(false);
        //       onClose();
        //     }}
        //     src="/icons/close.svg"
        //     alt="Close"
        //     width={24}
        //     height={24}
        //   />
        // }
        footer={
          <>
            <CheckBox
              txt="I agree"
              checked={isCheck}
              onChange={(checked: boolean) => {
                setIsCheck(checked);
              }}
            />
            <Button onClick={handlerSubscription} disabled={disabled}>
              OK
            </Button>
          </>
        }
      >
        <span>
          Auto-renewal will be enabled with this payment. You can disable it
          anytime in your profile settings
        </span>
      </CommonNotificationModal>
    </Modal>
  );
};
