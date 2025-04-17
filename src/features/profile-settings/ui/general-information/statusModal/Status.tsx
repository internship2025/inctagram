import { Button } from "@/shared/ui/button/button";
import s from "./Status.module.css";

type Props = {
  message: string;
  onClose?: () => void;
};

export const Status = ({ message, onClose }: Props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.text}>{message}</div>
      <div className={s.button}><Button  onClick = { onClose}>Ok</Button></div>
    </div>
  );
};
