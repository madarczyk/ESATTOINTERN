import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import {Repository} from "typeorm";
import { AddPatientDto } from './addpatient.dto';
import { EditPatientDto } from './editpatient.dto';


@Injectable()
export class PatientService {
    constructor(@InjectRepository(Patient)public readonly patientRepo: Repository<Patient>,
    ){}

    async findAllPatients(): Promise<Patient[]>{
        let patient = await this.patientRepo.find();
        return patient;
    }
    async addPatient(addPatientDto:AddPatientDto): Promise<string>{
        let patient: Patient = new Patient();
        patient.firstname = addPatientDto.firstname;
        patient.lastname = addPatientDto.lastname;
        patient.pesel = addPatientDto.pesel;
        patient.street = addPatientDto.street;
        patient.city = addPatientDto.city;
        patient.zipcode = addPatientDto.zipcode;

        await this.patientRepo.save(patient)

        return "Patient has been added";
    }
    async selectPatient(id: number): Promise<Patient>{
        let patient = await this.patientRepo.findOne({where:{id:id}});
        return patient;
    }
    async editPatient(id: number, editPatientDto: EditPatientDto): Promise<string>{
        let patient: Patient = await this.patientRepo.findOne({where:{ id }})

        if(!patient){
            throw new Error("Patient not found");
        }
        patient.firstname = editPatientDto.firstname;
        patient.lastname = editPatientDto.lastname;
        patient.street = editPatientDto.street;
        patient.city = editPatientDto.city;
        patient.zipcode = editPatientDto.zipcode;

        await this.patientRepo.save(patient)

        return "Patient has been updated";
    }
    async deletePatient(id:number): Promise<String>{
        await this.patientRepo.delete(id)
        return "Patient has been deleted"
    }

}
