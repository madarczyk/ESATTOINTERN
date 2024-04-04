import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './doctorslist.module.scss';

type doctor = {
    id: number;
    firstname: string;
    lastname: string;
    pesel: string;
    street: string;
    city: string;
    zipcode: string;
    specialization: string;
};
const DoctorsList: React.FC  <{onSelectionChange: (selectedIds: Set<number>) => void}> = ({ onSelectionChange}) =>{
    const [doctors, setdoctors] = useState<doctor[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    useEffect(() => {
        const showdoctors = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/doctor/alldoctors', { withCredentials: true });
                setdoctors(response.data);
            } catch (error) {
                console.error("Error showing doctors:", error);
            } finally {
            setLoading(false);
            }
        };
        showdoctors();
    }, []);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, doctorId: number) => {
        const newSelectedIds = new Set<number>(selectedIds);
        if (e.target.checked) {
            newSelectedIds.add(doctorId);
        } else {
            newSelectedIds.delete(doctorId)
        }
        setSelectedIds(newSelectedIds);
        onSelectionChange(newSelectedIds);
       }
    return (
        <div className={styles.main}>
                {loading ? (
                    <p>Loading Doctors...</p>
                ) : (
                    doctors.map((doctor) => (
                        <div className={styles.data} key={doctor.id}>
                             <input type="checkbox" checked={selectedIds.has(doctor.id)} onChange={e => handleChange (e,doctor.id)}/>
                            <p>{doctor.id}</p>
                            <p>{doctor.firstname}</p>
                            <p>{doctor.lastname}</p>
                            <p>{doctor.pesel}</p>
                            <p>{doctor.street}</p>
                            <p>{doctor.city}</p>
                            <p>{doctor.zipcode}</p>
                            <p>{doctor.specialization}</p>
                        </div>
                    ))
                )}
        </div>
    );
};
export default DoctorsList;