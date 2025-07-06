import { AppointmentsEntity } from 'src/core/entity/appointments.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UsersEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

@Column({ name: 'full_name', nullable: false })
full_name: string;


@Column({ nullable: false })
phone: string;

    @Column({type:'varchar',unique:true})
    email:string;

    @Column({type:'varchar',unique:true})
    password:string;

    @Column({type:'varchar'})
    role:string;
      @Column({ type: 'varchar', nullable: true }) 
  gender: string;


@Column()
birth_date: Date;
    @Column({type:'varchar'})
    address:string;

@Column({ nullable: true })
specialization: string;

@Column({ nullable: true })
experience_years: number;

    @CreateDateColumn()
    created_at:Date

    @Column({ nullable: true })
    verificationCode: string;

@Column({ type: 'bigint', nullable: true })
telegram_chat_id: number;

@OneToMany(() => AppointmentsEntity, (a) => a.user)
appointmentsAsUser: AppointmentsEntity[];

@OneToMany(() => AppointmentsEntity, (a) => a.doctor)
appointmentsAsDoctor: AppointmentsEntity[];

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