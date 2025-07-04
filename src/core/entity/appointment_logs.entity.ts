import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('appointment_logs')
export class Appointment_logsEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'int'})
    appointment_id:number;

    @Column({type:'varchar'})
    status:string

    @Column({type:'int'})
    changed_by:number

    @Column({type:'varchar'})
    changed_at:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
//   @ManyToOne(() => Appointment, a => a.logs)
//   @JoinColumn({ name: 'appointment_id' })
//   appointment: Appointment;

//   @ManyToOne(() => User, user => user.appointmentLogs)
//   @JoinColumn({ name: 'changed_by' })
//   changedBy: User;
}
