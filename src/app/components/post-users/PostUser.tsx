import Image from "next/image";
import photo from './../../../../public/images/photo.png'
type Props = {
  setIsmodal: (isModal: boolean) => void;
  postImg: string | undefined;
};

const PostUser = ({ setIsmodal, postImg }: Props) => {
  return (
    <>
      <div onClick={() => setIsmodal(true)}>
        <Image width={234} height={228} alt="" src={postImg || photo} />
      </div>
    </>
  );
};

export default PostUser;
