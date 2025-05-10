import { ReactNode } from "react";
import s from './CommonNotification.module.css'

type Props = {
  title?: ReactNode;
  children?: ReactNode;
  cross?: ReactNode;
  footer?: ReactNode;
  line?: boolean;
  footerAlign?: 'left' | 'center' | 'right' | 'space-between'; 
};

export const CommonNotificationModal = ({
  title,
  children,
  cross,
  footer,
  footerAlign = 'space-between',
  line,
}: Props) => {
  return (
    <div className={s.wrapper}>
      <div className={`${s.header} ${cross ? s.withCross : ""}`}>
        {title && <div>{title}</div>}
        {cross && <div className={s.cross}>{cross}</div>}
      </div>
      {line && <div className={s.box}></div>}
      <div>
        <div className={s.text}> {children}</div>
        {footer && <div className={`${s.footer} ${s[`footer--${footerAlign}`]}`}>{footer}</div>}
      </div>
    </div>
  );
};
