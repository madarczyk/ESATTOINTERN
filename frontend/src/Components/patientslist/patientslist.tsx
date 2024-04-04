import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './patientslist.module.scss';

type patient = {
    id: number;
    firstname: string;
    lastname: string;
    pesel: string;
    street: string;
    city: string;
    zipcode: string;
};
const PatientsList: React.FC  <{onSelectionChange: (selectedIds: Set<number>) => void}> = ({ onSelectionChange}) =>{
    const [patients, setpatients] = useState<patient[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    useEffect(() => {
        const showpatients = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/patient/allpatients', { withCredentials: true });
                setpatients(response.data);
            } catch (error) {
                console.error("Error showing patients:", error);
            } finally {
            setLoading(false);
            }
        };
        showpatients();
    }, []);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, patientId: number) => {
        const newSelectedIds = new Set<number>(selectedIds);
        if (e.target.checked) {
            newSelectedIds.add(patientId);
        } else {
            newSelectedIds.delete(patientId)
        }
        setSelectedIds(newSelectedIds);
        onSelectionChange(newSelectedIds);
       }
    return (
        <div className={styles.main}>
                {loading ? (
                    <p>Loading Patients...</p>
                ) : (
                    patients.map((patient) => (
                        <div className={styles.data} key={patient.id}>
                             <input type="checkbox" checked={selectedIds.has(patient.id)} onChange={e => handleChange (e,patient.id)}/>
                            <p>{patient.id}</p>
                            <p>{patient.firstname}</p>
                            <p>{patient.lastname}</p>
                            <p>{patient.pesel}</p>
                            <p>{patient.street}</p>
                            <p>{patient.city}</p>
                            <p>{patient.zipcode}</p>
                        </div>
                    ))
                )}  
        </div>
    );
};

export default PatientsList;