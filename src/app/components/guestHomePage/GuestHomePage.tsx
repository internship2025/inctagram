import { getPublicPosts } from "@/services/userApi";
import PostsHome from "../postsHome/postsHome";
import RegisteredUsers from "../registeredUsers/RegisteredUsers";
import s from './GuestHomePage.module.css'




const GuestHomePage = async () => {
  const data = await getPublicPosts();


  let posts = data?.items.map((it: any) => {
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
