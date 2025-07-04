import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('appointment_id')
export class Feedbacks{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'int'})
    appointment_id:number;

    @Column({type:'int'})
    patient_id:number;

    @Column({type:'int'})
    rating:number;

    @Column({type:'varchar'})
    comment:string;

    @CreateDateColumn()
    created_at:Date

//     @ManyToOne(() => Appointment, a => a.feedbacks)
//     @JoinColumn({ name: 'appointment_id' })
//     appointment: Appointment;

//     @ManyToOne(() => User, user => user.feedbacks)
//   @JoinColumn({ name: 'patient_id' })
//   patient: User;
}