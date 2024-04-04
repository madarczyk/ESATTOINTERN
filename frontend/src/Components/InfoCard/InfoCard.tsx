import React from 'react';
import styles from './InfoCard.module.scss';
import Link from 'next/link';

interface InfoCardProps {
    type: 'patients' | 'doctors' | 'appointments';
}
interface InfoData {
    title: string;
    options: string[];
    buttonText: string;
}
const data: Record<InfoCardProps['type'], InfoData> = {
    patients: {
        title: "patients",
        options: [
            "Check patients in database",
        ],
        buttonText: "Check here"
    },
    doctors: {
        title: "doctors",
        options: [
            "Check doctors in database",
        ],
        buttonText: "Check here"
    },
    appointments:{
        title: "appointments",
        options:[
            "Check appointments",
        ],
        buttonText: "Check here"
    },
};
export default function InfoCard({type}: InfoCardProps) {
    const content = data[type];
    return (
        <div className={styles.container}>
            <div className={styles.title}>{content.title}</div>
            <div className={styles.content}>
                {content.options.map((option, index) => (
                    <p key={index} className={styles.option}>{option}</p>
                ))}
            </div>
            {type === 'patients' ? (
                <Link href="/patients" passHref>
                    <li className={styles.btn}>{content.buttonText}</li>
                </Link>
            ) : type === 'doctors' ?  (
                <Link href="/doctors" passHref>
                <li className={styles.btn}>{content.buttonText}</li>
                </Link>
            ) : type === 'appointments' ? (
                <Link href="/appointments" passHref>
                    <li className={styles.btn}>{content.buttonText}</li>
                </Link>
            ) : (
                <i>error</i>
            )}
        </div>
    );
}