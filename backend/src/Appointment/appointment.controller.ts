import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AddAppointmentDto } from './addappointment.dto';
import {EditAppointmentDto} from './editappointment.dto';

@Controller('appointment')
export class AppointmentController {
    constructor(public readonly appointmentService: AppointmentService){}
    @Get('/allappointments')
    getaAllAppointments (){
        return this.appointmentService.findAllAppointments()
    }
    @Post('/addappointment')
    addAppointment(@Body() addAppointmentDto:AddAppointmentDto){
        return this.appointmentService.addAppointment(addAppointmentDto)
    }
    @Get(':id')
    getOneAppointment(@Param ('id')id:number){
        return this.appointmentService.selectAppointment(id)
    }
   
    @Patch('/editappointment/:id')
    editAppointment(@Param('id') id:number, @Body() editAppointmentDto: EditAppointmentDto) {
        return this.appointmentService.editAppointment(id, editAppointmentDto);
    }
    @Delete('/deleteappointment/:id')
    deleteAppointment(@Param('id')id:number){
        return this.appointmentService.deleteAppointment(id);
    }
}
