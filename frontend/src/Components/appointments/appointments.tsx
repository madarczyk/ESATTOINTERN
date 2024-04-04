import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './appointments.module.scss';
import { parseISO, format } from 'date-fns';


type appointment = {
    id: number;
    appointmentDate:string;
    room:string;
    patientId:number;
    doctorId:number; 
};

const AppointmentsList: React.FC <{onSelectionChange: (selectedIds: Set<number>) => void}> = ({ onSelectionChange}) => {
    const [appointments, setAppointments] = useState<appointment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    useEffect(() => {
        const showAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/appointment/allappointments', { withCredentials: true });
                setAppointments(response.data);
            } catch (error) {
                console.error("Error showing appointments:", error);
            } finally {
                setLoading(false);
            }
        };
        showAppointments();
    }, []);
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, appointmentId: number) => {
    const newSelectedIds = new Set<number>(selectedIds);
    if (e.target.checked) {
        newSelectedIds.add(appointmentId);
    } else {
        newSelectedIds.delete(appointmentId)
    }
    setSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds);
   }
    return (
        <div className={styles.main}>
            {loading ? (
                <p>Loading appointments...</p>
            ) : (
                <>
                    {appointments.map((appointment) => (
                        <div className={styles.data} key={appointment.id}>
                            <input type="checkbox" checked={selectedIds.has(appointment.id)} onChange={e => handleChange (e,appointment.id)}/>
                            <p>{appointment.appointmentDate}</p>
                            <p>{appointment.room}</p>
                            <p>{appointment.patient.firstname} {appointment.patient.lastname}</p>
                            <p>{appointment.doctor.firstname} {appointment.doctor.lastname}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};
export default AppointmentsList;
