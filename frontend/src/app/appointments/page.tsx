'use client'
import styles from './appointments.module.scss';
import { useState  } from 'react';
import Appointmentslist from '../../Components/appointments/appointments'
import axios from 'axios';
import EditFunction from '@/Components/editfunction/editfunction';
import AddFunction from '@/Components/addfunction/addfunction';


export default function appointments(){
    const [selectedAppointments, setSelectedAppointments] = useState<Set<number>>(new Set());
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const handleAddClick = () => {
      setIsAdding(true);
    }
    const handleEditClick = () => {
        if (selectedAppointments.size === 1) {
          setIsEditing(true);
        } else {
          alert("Please select exactly one appointment to edit."); 
        }
      };
    const handleSelectionChange = (selectedIds: Set<number>) =>{
        setSelectedAppointments(selectedIds);
    };
    const handleDelete = () => {
        selectedAppointments.forEach(id => {
          axios.delete(`http://localhost:3000/appointment/deleteappointment/${id}`, { withCredentials: true })
            .then(() => {
              console.log(`Appointment has been deleted on ID: ${id}`);
              
              const newSelectedAppointments = new Set(selectedAppointments);
              newSelectedAppointments.delete(id);
              setSelectedAppointments(newSelectedAppointments);
            })
            .catch(error => console.error('Error:', error));   
        });
      };
return(
    <div className={styles.main}>
        <div className={styles.editors}>
            <div className={styles.add}> 
              {isAdding ? (
              <AddFunction pageType="appointments" />
              ) : (
              <button onClick={handleAddClick}>Add Appointment</button>
              )}
            </div>
            <div className={styles.edit}> 
              {isEditing ? (
              <EditFunction pageType="appointments" appointmentId={Array.from(selectedAppointments)[0]} />
              ) : (
              <button onClick={handleEditClick}>Edit Appointment</button>
              )}
            </div>
            <div className={styles.delete}><button onClick={handleDelete}>Delete Appointment</button></div>
        </div>
        <div className={styles.appointmentsHeader}>
                    <span>Date</span>
                    <span>Room</span>
                    <span>Patient</span>
                    <span>Doctor</span>
        </div>
        <div className={styles.container}>
            <Appointmentslist onSelectionChange={handleSelectionChange} />
        </div>
    </div>
  )
}


