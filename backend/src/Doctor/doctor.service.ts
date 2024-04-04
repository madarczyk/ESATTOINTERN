import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import {Repository} from "typeorm";
import { AddDoctorDto } from './adddoctor.dto';
import { EditDoctorDto } from './editdoctor.dto';


@Injectable()
export class DoctorService {
    constructor(@InjectRepository(Doctor)public readonly doctorRepo: Repository<Doctor>,
    ){}

    async findAllDoctors(): Promise<Doctor[]>{
        let doctor = await this.doctorRepo.find();
        return doctor;
    }
    async addDoctor(addDoctorDto:AddDoctorDto): Promise<string>{
        let doctor: Doctor = new Doctor();
        doctor.firstname = addDoctorDto.firstname;
        doctor.lastname = addDoctorDto.lastname;
        doctor.pesel = addDoctorDto.pesel;
        doctor.street = addDoctorDto.street;
        doctor.city = addDoctorDto.city;
        doctor.zipcode = addDoctorDto.zipcode;
        doctor.specialization= addDoctorDto.specialization;

        await this.doctorRepo.save(doctor)

        return "Doctor has been added";
    }
    async selectDoctor(id: number): Promise<Doctor>{
        let doctor = await this.doctorRepo.findOne({where:{id:id}});
        return doctor;
    }
    async editDoctor(id: number, editDoctorDto: EditDoctorDto): Promise<string>{
        let doctor: Doctor = await this.doctorRepo.findOne({where:{ id }})

        if(!doctor){
            throw new Error("Doctor not found");
        }
        doctor.firstname = editDoctorDto.firstname;
        doctor.lastname = editDoctorDto.lastname;
        doctor.street = editDoctorDto.street;
        doctor.city = editDoctorDto.city;
        doctor.zipcode = editDoctorDto.zipcode;
        doctor.specialization= editDoctorDto.specialization;
        
        await this.doctorRepo.save(doctor)

        return "Doctor has been updated";
    }
    async deleteDoctor(id:number): Promise<String>{
        await this.doctorRepo.delete(id)
        return "Doctor has been deleted"
    }

}
