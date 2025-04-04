import UserProfile from "@/app/components/userProfile/userProfile";
import { getPostsUser, getPostUser, getPublicUser } from "@/services/userApi";


const Profile = async ({ params, searchParams }: { params: { id: string },   searchParams: { [key: string]: string | string[] | undefined }; }) => {
  const data = await getPublicUser(Number(params.id));
  const posts = await getPostsUser(Number(params.id));
  const post = searchParams.postId ? await getPostUser(searchParams.postId) : null

  return (
    <>
      <UserProfile data={data} initialPosts = {posts} post = {post}/>
    </>
  );
};

export default Profile;
