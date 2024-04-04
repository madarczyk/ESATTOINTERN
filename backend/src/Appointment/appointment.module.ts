import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Appointment} from './appointment.entity';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { DoctorModule } from 'src/doctor/doctor.module';
import { PatientModule } from 'src/patient/patient.module';

@Module({imports:[TypeOrmModule.forFeature([Appointment]),PatientModule,DoctorModule],
    providers:[AppointmentService],
    controllers:[AppointmentController],
    exports:[AppointmentService],
})
export class AppointmentModule {}
