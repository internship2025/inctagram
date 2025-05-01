export type Post = {
  id: number;
  description: string;
  postId: number;
  userName: string;
  updatedAt: string;
  avatarOwner: string;
  ownerId: string;
  images: PostImage[];
};

export type PostImage = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};
