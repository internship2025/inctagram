import { CheckBox } from "@/shared/ui/checkBox/checkBox";
import { useToggleAutoSubscription } from "../../hooks/useToggleAutoSubscription";
import s from './AutoReneval.module.css'
import Loading from "@/app/loading";

type Props = {
  isCheck: boolean;
};

export const AutoReneval = ({ isCheck }: Props) => {
  const { handler, isLoading } = useToggleAutoSubscription(isCheck);
  

  console.log(isCheck)
  return (
    <div className={s.wrapper}>
       {isLoading && <Loading/>}
      <CheckBox
        txt="Auto-Renewal"
        checked={isCheck}
        onChange={() => {
          handler();
        }}
        disabled={isLoading || !isCheck}
      />
    </div>
  );
};
