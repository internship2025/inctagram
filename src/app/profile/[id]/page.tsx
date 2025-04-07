// app/profile/[id]/page.tsx
import { UserProfile } from "@/app/components/userProfile/userProfile";
import { getPostsUser, getPublicUser } from "@/services/userApi";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
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

  return <UserProfile data={data} initialPosts={initialPosts} />;
};

export default Profile;