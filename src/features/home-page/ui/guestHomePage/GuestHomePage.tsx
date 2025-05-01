import { getPublicPosts } from "@/features/home-page/api/userApi";
import PostsHome from "@/features/home-page/ui/postsHome/postsHome";
import RegisteredUsers from "@/features/home-page/ui/registeredUsers/RegisteredUsers";
import s from "./GuestHomePage.module.css";
import { Post } from "@/features/home-page/types/post.types";

const GuestHomePage = async () => {
  const data = await getPublicPosts();

  const posts = data?.items.map((it: Post) => {
    return <PostsHome key={it.id} {...it} />;
  });

  return ( 
    <div>
      <RegisteredUsers />
      <div className={s.wrapper}>{posts}</div>
    </div>
  );
};

export default GuestHomePage;
