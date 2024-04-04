
import React, {useState, useEffect } from 'react';
import styles from './addfunction.module.scss';
import {useForm} from 'react-hook-form';
import axios from 'axios';
interface AddProps {
    pageType: 'patients' | 'doctors' | 'appointments';
}
const AddFunction: React.FC<AddProps> = ({pageType}) => {
    const {register, handleSubmit} = useForm({});
    const onSubmit = async (data:any) => {
        try {
            let endpoint = '';
            switch (pageType) {
                case 'patients':
                    endpoint = `/Patient/addpatient`;
                    break;
                case 'doctors':
                    endpoint = `/Doctor/adddoctor`;
                    break;
                case 'appointments':
                    endpoint = `/Appointment/addappointment`;
                    break;
            }
             await axios.post(`http://localhost:3000${endpoint}`, data, { withCredentials: true });
        } catch (error){
            console.error("Error during creating:", error)
        }
        };
    return(
        <div className={styles.addformmain}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                {pageType === 'patients' || pageType === 'doctors' ? (
                    <>
                       <input type="text" required className={styles.data} {...register("firstname")} placeholder="first name" />
                        <input type="text" required className={styles.data} {...register("lastname")} placeholder="last name" />
                        <input type="text" required className={styles.data} {...register("pesel")} placeholder="PESEL" />
                        <input type="text" required className={styles.data} {...register("street")} placeholder="Street" />
                        <input type="text" required className={styles.data} {...register("city")} placeholder="City" />
                        <input type="text" required className={styles.data} {...register("zipcode")} placeholder="ZIP-Code" />
                        {pageType === 'doctors' && <input type="text" className={styles.data} {...register("specialization")} placeholder="Specialization" />}
                    </>
                ) : pageType === 'appointments' ? (
                    <>
                        <input type="text" className={styles.data} required {...register("appointmentDate")} placeholder="appointment Date" />
                        <input type="text" className={styles.data} required {...register("room")} placeholder="room" />
                        <input type="text" className={styles.data} required {...register("patientId")} placeholder="Patient ID" />
                        <input type="text" className={styles.data} required {...register("doctorId")} placeholder="Doctor ID" />
                    </>
                ) : null}
                <button className={styles.submit} type="submit">Save changes</button>
            </form>
        </div>
    )
}
export default AddFunction;