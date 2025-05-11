import { Button } from "@/shared/ui/button/button";
import { PayPal } from "./PayPal";
import { Stripe } from "./Stripe";
import s from "./PaymentButtons.module.css";
import { PaymentConfirmationModal } from "./PaymentConfirmationModal";
import { SubscriptionType } from "../hooks/useSubscriptionType";
import {usePaymentHandlers } from "../hooks/usePaymentHandlers";
import { DataType } from "../hooks/useSetSubscription";

type Props = {
  subscriptionType: SubscriptionType;
  amount: number;
  handler: (data: DataType)=> void
};

export const PaymentButtons = ({ subscriptionType, amount, handler }: Props) => {
  const { isModalOpen, selectedPayment, handlerPay, setIsModalOpen, url } =
    usePaymentHandlers();

  return (
    <div className={s.wrapper}>
      <Button
        onClick={() => handlerPay("PAYPAL")}
        variant="text"
        className={s.btn}
      >
        <PayPal />
      </Button>
      <div className={s.text}>
        <span>Or</span>
      </div>
      <Button
        onClick={() => handlerPay("STRIPE")}
        variant="text"
        className={s.btn}
      >
        <Stripe />
      </Button>
      <PaymentConfirmationModal
        selectedPayment={selectedPayment}
        subscriptionType={subscriptionType}
        amount={amount}
        url = {url}
        isModalOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        handler = {handler}
      />
    </div>
  );
};
