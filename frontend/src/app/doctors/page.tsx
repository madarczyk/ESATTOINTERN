'use client'
import styles from './doctors.module.scss';
import { useState  } from 'react';
import Doctorslist from '../../Components/doctorslist/doctorslist';
import axios from 'axios';
import EditFunction from '@/Components/editfunction/editfunction';
import AddFunction from '@/Components/addfunction/addfunction';


export default function doctors(){
    const [selectedDoctors, setSelectedDoctors] = useState<Set<number>>(new Set());
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const handleAddClick = () => {
      setIsAdding(true);
    }
    const handleEditClick = () => {
        if (selectedDoctors.size === 1) {
          setIsEditing(true);
        } else {
          alert("Please select exactly one doctor to edit."); 
        }
      };
    const handleSelectionChange = (selectedIds: Set<number>) =>{
        setSelectedDoctors(selectedIds);
    };
    const handleDelete = () => {
        selectedDoctors.forEach(id => {
          axios.delete(`http://localhost:3000/doctor/deletedoctor/${id}`, { withCredentials: true })
            .then(() => {
              console.log(`doctor has been deleted on ID: ${id}`);
              const newSelectedDoctors = new Set(selectedDoctors);
              newSelectedDoctors.delete(id);
              setSelectedDoctors(newSelectedDoctors);
            })
            .catch(error => console.error('Error:', error));   
        });
      };
      
return(
    <div className={styles.main}>
        <div className={styles.editors}>
            <div className={styles.add}> 
              {isAdding ? (
              <AddFunction pageType="doctors" />
              ) : (
              <button onClick={handleAddClick}>Add Doctor</button>
              )}
            </div>
            <div className={styles.edit}> 
              {isEditing ? (
              <EditFunction pageType="doctors" appointmentId={Array.from(selectedDoctors)[0]} />
              ) : (
              <button onClick={handleEditClick}>Edit Doctor</button>
              )}
            </div>
            <div className={styles.delete}><button onClick={handleDelete}>Delete Doctor</button></div>
        </div>
        <div className={styles.doctorsHeader}>
                    <span>ID</span>
                    <span>First Name</span>
                    <span>Last Name</span>
                    <span>PESEL</span>
                    <span>street</span>
                    <span>city</span>
                    <span>ZIP-Code</span>
                    <span>specialization</span>
        </div>
        <div className={styles.container}>
            <Doctorslist onSelectionChange={handleSelectionChange} />
        </div>
    </div>
  )
}


