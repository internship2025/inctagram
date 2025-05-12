import { ReactNode } from "react";
import s from './CommonNotification.module.css'

type Props = {
  children?: ReactNode;
  footer?: ReactNode;
  line?: boolean;
  footerAlign?: 'left' | 'center' | 'right' | 'space-between'; 
};

export const CommonNotificationModal = ({
  children,
  footer,
  footerAlign = 'space-between',
  line,
}: Props) => {
  return (
    <div >
      {line && <div className={s.box}></div>}
      <div className={s.wrapper}>
        <div className={s.text}> {children}</div>
        {footer && <div className={`${s.footer} ${s[`footer--${footerAlign}`]}`}>{footer}</div>}
      </div>
    </div>
  );
};
