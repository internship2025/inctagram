import { AvatarResponseType } from "@/features/home-page/ui/user-profile/api/types";

export type SubscriptionType = {
  amount: number;
  paymentType: "STRIPE" | "PAYPAL";
  typeSubscription: "DAY" | "WEEKLY" | "MONTHLY";
  baseUrl: string;
};

export type CurrentSubscriptionType = {
  data: [
    {
      userId: number;
      subscriptionId: string;
      dateOfPayment: string;
      endDateOfSubscription: string;
      autoRenewal: boolean;
    },
  ];
  hasAutoRenewal: boolean;
};

export type UserProfile = {
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  region?: string;
  dateOfBirth?: string;
  aboutMe?: string;
};

export type Avatar = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
};

export type ExtendedUserProfile = UserProfile & {
  id: number;
  avatars: AvatarResponseType[];
  createdAt: string;
};

export type ErrorResponse = {
  statusCode: number;
  messages: Array<{
    message: string;
    field: string;
  }>;
  error: string;
};

export type PaymentInfo = {
  userId: number;
  subscriptionId: string;
  dateOfPayment: string;
  endDateOfSubscription: string;
  price: number;
  subscriptionType: string;
  paymentType: string;
};
