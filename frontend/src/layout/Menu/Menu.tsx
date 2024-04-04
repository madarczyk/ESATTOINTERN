import styles from './Menu.module.scss';
import Link from 'next/link';


interface MenuProps {
    className: string;
    onClose: () => void;
  }
export default function Menu({ className, onClose }: MenuProps) {
    return(
        <ul className={`${styles.container} ${className}`}>
      <li className={styles.option} onClick={onClose}><Link href='/patients'>Patients</Link></li>
      <li className={styles.option} onClick={onClose}><Link href='/doctors'>Doctors</Link></li>
      <li className={styles.option} onClick={onClose}><Link href='/appointments'>Appointments</Link></li>
      <li className={styles.option} onClick={onClose}><Link href='/contact'>Conctact</Link></li>
    </ul>
    )
}