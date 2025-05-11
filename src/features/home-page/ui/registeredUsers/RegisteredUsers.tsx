import { getRegistratedUser } from "@/features/home-page/api/userApi";
import s from "./RegisteredUsers.module.css";

const RegisteredUsers = async () => {
  const data = await getRegistratedUser();

  function requiresZeroPadding() {
    if (data) {
      const m = String(data.totalCount);
      if (m.length === 3) {
        return `000${data.totalCount}`;
      } else if (m.length === 4) {
        return `00${data.totalCount}`;
      } else if (m.length === 5) {
        return `0${data.totalCount}`;
      }
      return String(data.totalCount);
    }
  }

  const count = requiresZeroPadding();
  const m = [];
  if (count) {
    for (let i = 0; i < count?.length; i++) {
      m.push(<span key={i} className={s.number}>{count[i]}</span>);
    }
  }

  return (
    <div className={s.wrapper}>
      <div>Registered users:</div>
      <div className={s.countUser}>{m}</div>
    </div>
  );
};

export default RegisteredUsers;
