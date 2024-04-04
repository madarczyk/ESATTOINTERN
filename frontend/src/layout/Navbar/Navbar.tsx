'use client'
import {useEffect, useState} from 'react';
import Link from 'next/link';
import Menu from '@/layout/Menu/Menu';
import styles from './Navbar.module.scss';
import Overlay from "@/layout/Overlay/Overlay";



export default function Navbar() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsSticky(scrollPosition > 0);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const ShowMenu = () => {
        setMenuIsOpen(!menuIsOpen);
    }

    const CloseMenu = () => {
        setMenuIsOpen(false);
    }

    return (
        <div className={`${styles.container} ${isSticky ? styles.sticky : ''}`}>
            <Link href='/'><span className={styles.logo}>Esatto Medical Center</span></Link>
            <Menu className={menuIsOpen ? styles.menuOpen : ''} onClose={CloseMenu} />

            <ul className={styles.navigation}>
                <Link href={'/patients'}>
                    <li className={styles.option}>Patients list</li>
                </Link>
                <Link href={'/doctors'}>
                    <li className={styles.option}>Doctors list</li>
                </Link>
                <Link href={'/appointments'}>
                    <li className={styles.option}>Appointments</li>
                </Link>
                <Link href={'/contact'}>
                    <li className={styles.option}>Contact</li>
                </Link>
            </ul>
            <Overlay className={menuIsOpen ? styles.overlayShow : ''} onClick={CloseMenu} />
        </div>
    );
}