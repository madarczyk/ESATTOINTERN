import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { AddDoctorDto } from './adddoctor.dto';
import {EditDoctorDto} from './editdoctor.dto';

@Controller('doctor')
export class DoctorController {
    constructor(public readonly doctorService: DoctorService){}
    @Get('/alldoctors')
    getaAllDoctors (){
        return this.doctorService.findAllDoctors()
    }
    @Post('/adddoctor')
    addDoctor(@Body() addDoctorDto:AddDoctorDto){
        return this.doctorService.addDoctor(addDoctorDto)
    }
    @Get(':id')
    getOneDoctor(@Param ('id')id:number){
        return this.doctorService.selectDoctor(id)
    }
   
    @Patch('/editdoctor/:id')
    editDoctor(@Param('id') id:number, @Body() editDoctorDto: EditDoctorDto) {
        return this.doctorService.editDoctor(id, editDoctorDto);
    }
    @Delete('/deletedoctor/:id')
    deleteDoctor(@Param('id')id:number){
        return this.doctorService.deleteDoctor(id);
    }
}
