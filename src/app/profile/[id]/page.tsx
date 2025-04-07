import { UserProfile } from "@/app/components/userProfile/userProfile";
import { getPostsUser, getPostUser, getPublicUser } from "@/services/userApi";

const Profile = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const data = await getPublicUser(Number(params.id));
  const posts = await getPostsUser(Number(params.id));
  const post = searchParams.postId
    ? await getPostUser(searchParams.postId)
    : null;

  return (
    <>
      <UserProfile data={data} initialPosts={posts} />
    </>
  );
};

export default Profile;
