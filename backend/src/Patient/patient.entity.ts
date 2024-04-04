import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "src/Appointment/appointment.entity";

@Entity()
export class Patient{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({name: "first_name"})
    firstname:string;

    @Column({name: "last_name"})
    lastname:string;

    @Column()
    pesel:string;

    @Column()
    street:string;

    @Column()
    city:string;

    @Column()
    zipcode:string;

    @OneToMany(type => Appointment, appointment => appointment.patient, {nullable: true})
    
    appointment?: Appointment[];

}