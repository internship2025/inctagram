import {CreateNewPasswordForm} from './CreateNewPasswordForm';
import styles from './page.module.css';

export default function CreateNewPasword() {
  return (
    <div className={styles.container}>
      <h1>Create New Password</h1>
      <CreateNewPasswordForm />
    </div>
  )
}
