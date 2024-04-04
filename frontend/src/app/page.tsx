import styles from './page.module.scss'
import InfoCard from "@/Components/InfoCard/InfoCard";
import Image from "next/image";
import Background from '../assets/images/patient.png';

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.welcomeSection}>    
                <Image className={styles.background} src={Background} alt={"background footage"}/>
                <div className={styles.content}>
                    <h1 className={styles.title}>Esatto Medical Center</h1>
                    <p className={styles.text}>All patients in one place</p>
                </div>
            </div>
            <div className={styles.infoCardContainer}>
                <InfoCard type='patients'/>
                <InfoCard type='doctors'/>
                <InfoCard type="appointments"/>
            </div>
        </div>
    )
}
