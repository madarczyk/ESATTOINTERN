import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { AddPatientDto } from './addpatient.dto';
import {EditPatientDto} from './editpatient.dto';

@Controller('patient')
export class PatientController {
    constructor(public readonly patientService: PatientService){}
    @Get('/allpatients')
    getaAllPatients (){
        return this.patientService.findAllPatients()
    }
    @Post('/addpatient')
    addPatient(@Body() addPatientDto:AddPatientDto){
        return this.patientService.addPatient(addPatientDto)
    }
    @Get(':id')
    getOnePatient(@Param ('id')id:number){
        return this.patientService.selectPatient(id)
    }
   
    @Patch('/editpatient/:id')
    editPatient(@Param('id') id:number, @Body() editPatientDto: EditPatientDto) {
        return this.patientService.editPatient(id, editPatientDto);
    }
    @Delete('/deletepatient/:id')
    deletePatient(@Param('id')id:number){
        return this.patientService.deletePatient(id);
    }
}
