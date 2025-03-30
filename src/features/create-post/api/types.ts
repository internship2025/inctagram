// Типы для изображений
export type Image = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};

// Тип для владельца
export type Owner = {
  firstName: string;
  lastName: string;
};

// Основной тип поста
export type PostItem = {
  id: number;
  userName: string;
  description: string;
  location: string;
  images: Image[];
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string;
  owner: Owner;
  likesCount: number;
  isLiked: boolean;
  avatarWhoLikes: boolean;
};

// Тип для метаданных
export type ChildMetadata = {
  uploadId: string;
};

// Тип для запроса на создание поста
export type CreatePostRequest = {
  description: string;
  childrenMetadata: ChildMetadata[];
};

export type ResponceAllPosts = {
  totalCount: number;
  pageSize: number;
  totalUsers: number;
  items: PostItem[];
};

export type UploadFileResponse = {
  images: Image[];
};
