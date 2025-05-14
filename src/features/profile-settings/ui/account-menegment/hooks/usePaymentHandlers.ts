import { useEffect, useState } from "react";


export type PaymentMethod = 'STRIPE' | 'PAYPAL';


export const usePaymentHandlers = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
    const [url, setUrl] = useState('');

    const handlerPay = (value: PaymentMethod)=>{
        setSelectedPayment(value)
        setIsModalOpen(true)
    }

      useEffect(() => {
        const getUrl = () => {
          return window.location.href.replace(/\?.*$/, '');
        };
        setUrl(getUrl());
      }, []);

    return {
        isModalOpen,
        selectedPayment,
        handlerPay,
        setIsModalOpen,
        url
    }
}