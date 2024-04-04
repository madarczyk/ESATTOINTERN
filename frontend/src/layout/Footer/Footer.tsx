import styles from './Footer.module.scss';
import { RiFacebookBoxFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";
import { RiTiktokFill } from "react-icons/ri";
import { RiLinkedinBoxFill } from "react-icons/ri";
import Link from 'next/link';

export default function Footer() {
    return(
        <div className={styles.container}>
            <div className={styles.navigation}>
                <div className={styles.section1}>
                    <span className={styles.title}>Esatto Medical Center</span>
                    <ul className={styles.footerNav}>
                    <Link href='/'><li>Main page</li></Link>
                    <Link href='/patients'><li>patients</li></Link>
                    <Link href='/doctors'><li>doctors</li></Link>
                    <Link href='/appointments'><li>appointments</li></Link>
                    </ul>
                </div>
                <div className={styles.section2}>
                    <span className={styles.title}>about us</span>
                    <ul className={styles.footerNav}>
                    <Link href='/contact'><li>FAQ</li></Link>
                    </ul>
                </div>
                <div className={styles.contact}>
                    <span className={styles.title}>Contact</span>
                    <ul className={styles.footerNav}>
                        <li>Esattocall@esatto.help.com</li>
                        <li>+48 123 456 789</li>
                        <li>xxxxxxxxxx, 20-202</li>
                        <li>Krakow</li>
                    </ul>
                </div>
            </div>
            <div className={styles.credentials}>
                <p className={styles.credit}>© 2024 Esatto Medical Center | This page is created for internship purposes any usage without owner's permission is not provided. Any data and content here is imaginary.</p>
                <div className={styles.social}>
                    <Link href="https://www.facebook.com/"><RiFacebookBoxFill /></Link>
                    <Link href="https://www.instagram.com/"><RiInstagramFill /></Link>
                    <Link href="https://www.tiktok.com/"><RiTiktokFill /></Link>
                    <Link href="https://www.linkedin.com/"><RiLinkedinBoxFill /></Link>
                </div>
            </div>
        </div>
    )
}