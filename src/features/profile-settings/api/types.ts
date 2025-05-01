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

export type AvatarResponseType = {
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
