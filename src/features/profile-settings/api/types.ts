
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
  

type ExtendedUserProfile = UserProfile & {
    id: number;
    avatars: Avatar[];
    createdAt: string; 
  }

  type ErrorResponse = {
    statusCode: number;
    messages: Array<{
      message: string;
      field: string;
    }>;
    error: string;
  };