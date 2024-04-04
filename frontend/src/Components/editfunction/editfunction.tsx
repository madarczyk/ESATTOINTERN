
import React, {useState, useEffect } from 'react';
import styles from './editfunction.module.scss';
import {useForm} from 'react-hook-form';
import axios from 'axios';
interface EditProps {
    pageType: 'patients' | 'doctors' | 'appointments';
    initialData?:any;
    appointmentId?: number;
    doctorId?:number;
    patientId?:number;
}
const EditFunction: React.FC<EditProps> = ({pageType, initialData, appointmentId}) => {
    const {register, handleSubmit} = useForm({ defaultValues: initialData });
    const onSubmit = async (data:any) => {
    console.log(data);
    try {
        let endpoint = '';
        switch (pageType) {
            case 'patients':
                endpoint = `/patient/editpatient/${appointmentId}`;
                break;
            case 'doctors':
                endpoint = `/doctor/editdoctor/${appointmentId}`;
                break;
            case 'appointments':
                endpoint = `/appointment/editappointment/${appointmentId}`;
                break;
        }
         await axios.patch(`http://localhost:3000${endpoint}`,data, { withCredentials: true }); 
    } catch (error){
        console.error("Error during edition:", error)
    }
    };
    return(
        <div className={styles.editformmain}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                {pageType === 'patients' || pageType === 'doctors' ? (
                    <>
                        <input type="text" className={styles.data} required {...register("first_name")} placeholder="first name" />
                        <input type="text" className={styles.data} required {...register("last_name")} placeholder="last name" />
                        <input type="text" className={styles.data} required {...register("pesel")} placeholder="PESEL" />
                        <input type="text" className={styles.data} required {...register("street")} placeholder="Street" />
                        <input type="text" className={styles.data} required {...register("city")} placeholder="City" />
                        <input type="text" className={styles.data} required {...register("zipcode")} placeholder="ZIP-Code" />
                        {pageType === 'doctors' && <input type="text" className={styles.data} required {...register("specialization")} placeholder="Specialization" />}
                    </>
                ) : pageType === 'appointments' ? (
                    <>
                        <input type="text" className={styles.data} required {...register("appointmentDate")} placeholder="appointment Date" />
                        <input type="text" className={styles.data} required {...register("room")} placeholder="room" />
                        <input type="text" className={styles.data} required {...register("patientId")} placeholder="Patient ID" />
                        <input type="text" className={styles.data} required {...register("doctorId")} placeholder="Doctor ID" />
                    </>
                ) : null}
                <button className={styles.button} type="submit">Save changes</button>
            </form>
        </div>
    )
}
export default EditFunction;