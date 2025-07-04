import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UsersEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar',unique:true})
    full_name:string;

    @Column({type:'varchar',unique:true})
    phone:string;

    @Column({type:'varchar',unique:true})
    email:string;

    @Column({type:'varchar',unique:true})
    password:string;

    @Column({type:'varchar'})
    role:string;

    @Column({type:'varchar'})
    birth_date:string;

    @Column({type:'varchar'})
    address:string;

    @Column({type:'varchar'})
    specialization:string;

    @Column({type:'int'})
    experience_years:number;

    @CreateDateColumn()
    created_at:Date

// @OneToMany(() => Schedule, schedule => schedule.doctor)
//   schedules: Schedule[];

//   @OneToMany(() => Appointment, a => a.doctor)
//   doctorAppointments: Appointment[];

//   @OneToMany(() => Appointment, a => a.patient)
//   patientAppointments: Appointment[];

//   @OneToMany(() => AppointmentLog, log => log.changedBy)
//   appointmentLogs: AppointmentLog[];

//   @OneToMany(() => Notification, n => n.user)
//   notifications: Notification[];

//   @OneToMany(() => MessageQueue, m => m.user)
//   messages: MessageQueue[];

//   @OneToMany(() => Feedback, f => f.patient)
//   feedbacks: Feedback[];

//   @OneToMany(() => DashboardMetric, d => d.user)
//   dashboardMetrics: DashboardMetric[];
}