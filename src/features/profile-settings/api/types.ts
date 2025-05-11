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

type SubscriptionType = {
  amount: number;
  paymentType: 'STRIPE' | 'PAYPAL'
  typeSubscription: "DAY" | "WEEKLY" | "MONTHLY"
  baseUrl: string;
};


type CurrentSubscriptionType = {  
    data: [
      {
        userId: number,
        subscriptionId: string,
        dateOfPayment: string
        endDateOfSubscription: string
        autoRenewal: boolean
      }
    ],
    hasAutoRenewal: boolean
  
}

type UserProfile = {
    userName: string;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    region?: string;
    dateOfBirth?: string;
    aboutMe?: string;
  };
  
  type Avatar = {
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

  type ErrorResponse = {
    statusCode: number;
    messages: Array<{
      message: string;
      field: string;
    }>;
    error: string;
  };
  

