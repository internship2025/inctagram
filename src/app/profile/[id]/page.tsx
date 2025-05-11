import { UserProfile } from "@/features/home-page/ui/user-profile/ui/userProfile";
import {
  getPostsUser,
  getPostUser,
  getPublicUser,
} from "@/features/home-page/api/userApi";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ postId?: string }>;
};

const Profile = async ({ params, searchParams }: Props) => {
  const { id } = await params;

  if (isNaN(Number(id))) {
    throw new Error("Invalid user ID");
  }

  const [data, initialPosts] = await Promise.all([
    getPublicUser(Number(id)),
    getPostsUser(Number(id)),
  ]);

  let selectedPost = null;
  const { postId } = await searchParams;
  const postIdNumber = postId ? Number(postId) : NaN;

  if (!isNaN(postIdNumber)) {
    selectedPost = await getPostUser(postIdNumber);
  }

  return (
    <UserProfile
      data={data}
      initialPosts={initialPosts}
      selectedPost={selectedPost}
    />
  );
};

export default Profile;
