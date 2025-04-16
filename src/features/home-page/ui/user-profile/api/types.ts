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

export type PostsPublic = {
  totalCount: number;
  pageSize: number;
  totalUsers: number;
  items: [
    {
      id: number;
      userName: string;
      description: string;
      location: string;
      images: [
        {
          url: string;
          width: number;
          height: number;
          fileSize: number;
          createdAt: string;
          uploadId: string;
        },
      ];
      createdAt: string;
      updatedAt: string;
      ownerId: 1;
      avatarOwner: string;
      owner: {
        firstName: string;
        lastName: string;
      };
      likesCount: number;
      isLiked: boolean;
      avatarWhoLikes: boolean;
    },
  ];
};

export type PostImage = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};

export type PostDetailsResponse = {
  id: number;
  userName: string;
  description: string;
  location: string;
  images: PostImage[];
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string;
  owner: {
    firstName: string;
    lastName: string;
  };
  likesCount: number;
  isLiked: boolean;
  avatarWhoLikes: boolean;
};

export type PostsUserResponse = {
  totalCount: number;
  pageSize: number;
  items: PostDetailsResponse[];
  nextCursor: number | null;
};

export type UploadProfileAvatarResponse = {
  avatars: Avatar[];
};

export type Avatar = {
  createdAt: string;
  fileSize: number;
  height: number;
  url: string;
  width: number;
};

export type GetUserProfileResponse = {
  aboutMe: string;
  avatars: Avatar[];
  city: string;
  country: string;
  createdAt: string;
  dateOfBirth: string;
  firstName: string;
  id: number;
  lastName: string;
  region: string;
  userName: string;
};
