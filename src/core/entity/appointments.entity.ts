import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('appoinments')
export class AppoinmentsEntity {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({ type: 'int' })
  patient_id: number;

  @Column({ type: 'int' })
  doctor_id: number;

  @Column({ type: 'timestamp' })
  appointment_time: Date;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'varchar' })
  reason: string;

  @CreateDateColumn()
  created_at:Date;

  // @ManyToOne(() => User, user => user.patientAppointments)
  // @JoinColumn({ name: 'patient_id' })
  // patient: User;

  // @ManyToOne(() => User, user => user.doctorAppointments)
  // @JoinColumn({ name: 'doctor_id' })
  // doctor: User;

  // @OneToMany(() => AppointmentLog, log => log.appointment)
  // logs: AppointmentLog[];

  // @OneToMany(() => Feedback, f => f.appointment)
  // feedbacks: Feedback[];
}
