import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import  {Appointment}  from './appointment.entity';
import {Repository} from "typeorm";
import { AddAppointmentDto } from './addappointment.dto';
import { EditAppointmentDto } from './editappointment.dto';
import {Patient} from "../Patient/patient.entity";
import {Doctor} from "../Doctor/doctor.entity";
import { PatientService } from 'src/patient/patient.service';
import { DoctorService } from 'src/doctor/doctor.service';
import {ModuleRef} from "@nestjs/core";


@Injectable()
export class AppointmentService {
   
 
    constructor(@InjectRepository(Appointment)private readonly appointmentRepo: Repository<Appointment>,
  
     private moduleRef: ModuleRef) {}

    
                private get doctorService(): DoctorService {
                    return this.moduleRef.get(DoctorService, { strict: false });
                }
                
                private get patientService(): PatientService {
                    return this.moduleRef.get(PatientService, { strict: false });
                }
               
    async findAllAppointments(): Promise<Appointment[]>{
        return await this.appointmentRepo.find({relations:{patient:true, 
            doctor:true
        }});
    }

    async addAppointment(addAppointmentDto:AddAppointmentDto): Promise<string>{
        let appointment: Appointment = new Appointment();
        let patient: Patient = await this.patientService.selectPatient(addAppointmentDto.patient);
        let doctor: Doctor = await this.doctorService.selectDoctor(addAppointmentDto.doctor);
       
        appointment.appointmentDate = addAppointmentDto.appointmentDate;
        appointment.room = addAppointmentDto.room;
        appointment.patient = patient;
        appointment.doctor = doctor;
        

        await this.appointmentRepo.save(appointment)

        return "Appointment has been added";
    }
    async selectAppointment(id: number): Promise<Appointment>{
      
        return await this.appointmentRepo.findOne({where:{id: id}, relations: {patient: true,
             doctor: true
            }});
    }
    async editAppointment(id: number, editAppointmentDto: EditAppointmentDto): Promise<string>{
        let appointment: Appointment = await this.appointmentRepo.findOne({where:{ id }})
        
        if(!appointment){
            throw new Error("Appointment not found");
        }
        appointment.appointmentDate = editAppointmentDto.appointmentDate;
        appointment.room = editAppointmentDto.room;

        await this.appointmentRepo.save(appointment)

        return "Appointment has been updated";
    }
    async deleteAppointment(id:number): Promise<String>{
        await this.appointmentRepo.delete(id)
        return "Appointment has been deleted"
    }

}
