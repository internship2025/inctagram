import { UserProfile } from "@/features/home-page/ui/user-profile/ui/userProfile";
import {
  getPostsUser,
  getPostUser,
  getPublicUser,
} from "@/features/home-page/api/userApi";

type Props = {
  //params: { id: string };
  params: Promise<{ id: string }>;
  //searchParams: { [key: string]: string | string[] | undefined };
  searchParams: Promise<
    Record<"postId" | "action", string | string[] | undefined>
  >;
};

const Profile = async ({ params, searchParams }: Props) => {
  //const userId = Number(params.id);
  const { id } = await params;

  if (isNaN(Number(id))) {
    throw new Error("Invalid user ID");
  }

  const [data, initialPosts] = await Promise.all([
    getPublicUser(Number(id)),
    getPostsUser(Number(id)),
  ]);

  let selectedPost = null;
  //const postIdParam = searchParams.postId;
  const { postId } = await searchParams;
  //const postId = typeof postIdParam === "string" ? Number(postIdParam) : NaN;
  const postId1 = typeof postId === "string" ? Number(postId) : NaN;

  if (!isNaN(postId1)) {
    selectedPost = await getPostUser(postId);
  }

  return (
    <UserProfile
      data={data}
      initialPosts={initialPosts}
      // selectedPost={selectedPost}
    />
  );
};

export default Profile;
