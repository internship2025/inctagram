export type GetPublicUserProfileResponse = {
  aboutMe: string;
  avatars: {
    createdAt: string;
    fileSize: number;
    height: number;
    url: string;
    width: number;
  }[];
  id: number;
  userMetadata: {
    followers: number;
    following: number;
    publications: number;
  };
  userName: string;
};
