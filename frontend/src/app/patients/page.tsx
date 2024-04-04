'use client'
import styles from './patients.module.scss';
import { useState  } from 'react';
import Patientslist from '../../Components/patientslist/patientslist';
import axios from 'axios';
import EditFunction from '@/Components/editfunction/editfunction';
import AddFunction from '@/Components/addfunction/addfunction';


export default function patients(){
    const [selectedPatients, setSelectedPatients] = useState<Set<number>>(new Set());
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const handleAddClick = () => {
      setIsAdding(true);
    }
    const handleEditClick = () => {
        if (selectedPatients.size === 1) {
          setIsEditing(true);
        } else {
          alert("Please select exactly one patient to edit."); 
        }
      };
    const handleSelectionChange = (selectedIds: Set<number>) =>{
        setSelectedPatients(selectedIds);
    };
    const handleDelete = () => {
        selectedPatients.forEach(id => {
          axios.delete(`http://localhost:3000/Patient/deletepatient/${id}`, { withCredentials: true })
            .then(() => {
              console.log(`patient has been deleted on ID: ${id}`); 
              const newSelectedPatients = new Set(selectedPatients);
              newSelectedPatients.delete(id);
              setSelectedPatients(newSelectedPatients);
            })
            .catch(error => console.error('Error:', error));   
        });
      };
return(
    <div className={styles.main}>
        <div className={styles.editors}>
            <div className={styles.add}> 
              {isAdding ? (
              <AddFunction pageType="patients" />
              ) : (
              <button onClick={handleAddClick}>Add Patient</button>
              )}
            </div>
            <div className={styles.edit}> 
              {isEditing ? (
              <EditFunction pageType="patients" appointmentId={Array.from(selectedPatients)[0]} />
              ) : (
              <button onClick={handleEditClick}>Edit Patient</button>
              )}
            </div>
            <div className={styles.delete}><button onClick={handleDelete}>Delete Patient</button></div>
        </div>
        <div className={styles.patientsHeader}>
                    <span>ID</span>
                    <span>First Name</span>
                    <span>Last Name</span>
                    <span>PESEL</span>
                    <span>street</span>
                    <span>city</span>
                    <span>ZIP-Code</span>
        </div>
        <div className={styles.container}>
            <Patientslist onSelectionChange={handleSelectionChange} />
        </div>
        
    </div>
  )
}


