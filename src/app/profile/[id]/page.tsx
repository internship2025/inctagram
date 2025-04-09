// app/profile/[id]/page.tsx
import { UserProfile } from "@/app/components/userProfile/userProfile";
import { getPostsUser, getPublicUser, getPostUser } from "@/services/userApi";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Profile = async ({ params, searchParams }: Props) => {
  const userId = Number(params.id);

  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }

  const [data, initialPosts] = await Promise.all([
    getPublicUser(userId),
    getPostsUser(userId),
  ]);

 
  let selectedPost = null;
  const postIdParam = searchParams.postId;
  const postId = typeof postIdParam === "string" ? Number(postIdParam) : NaN;

  if (!isNaN(postId)) {
    selectedPost = await getPostUser(postId);
  }

  return <UserProfile data={data} initialPosts={initialPosts} selectedPost={selectedPost} />;
};

export default Profile;
