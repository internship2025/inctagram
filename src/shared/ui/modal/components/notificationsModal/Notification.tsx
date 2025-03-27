import { calculatingDate } from '@/features/auth/utils/dateUtils'
import s from './Notification.module.css'


type NotificationType = {
    messages: {
    id: number
    message: string
    isRead: boolean
    createdAt: string
  }
}

export const Notification = ({messages}: NotificationType) =>{

      const date = calculatingDate(messages.createdAt);

    return (
    <div className={s.wrapper}>
        <div>Новое уведомление!{messages.isRead && <span className={s.new}> Новое</span>}</div>
        {messages.message}
        <div className={s.date}>{date}</div>
    </div>
    )
}