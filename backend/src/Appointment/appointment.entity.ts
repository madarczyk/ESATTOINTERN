import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "src/patient/patient.entity";
import { Doctor } from "src/doctor/doctor.entity";

@Entity()
export class Appointment{

    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn({name: "appointment_date", type: 'varchar'})
    appointmentDate:string;

    @Column()
    room:string;

    @ManyToOne(type => Patient, patient => patient.appointment, {nullable: true})
    
    patient?: Patient;

    @ManyToOne(type => Doctor, doctor => doctor.appointment, {nullable: true}) 
   
    doctor?: Doctor;

}
