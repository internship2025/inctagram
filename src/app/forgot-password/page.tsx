import {ForgotPasswordForm} from './ForgotPasswordForm';
import styles from './page.module.css';

export default function ForgotPasswordPage() {
  return (
    <div className={styles.container}>
      <h1>Forgot Password</h1>
      <ForgotPasswordForm />
    </div>
  )
}
