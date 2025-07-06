import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { UsersEntity } from './users.entity';
@Entity('appointments') // ✅ nomni to‘g‘ri yozing
export class AppointmentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  patient_id: number;

  @Column({ type: 'int' })
  doctor_id: number;

  @Column({ type: 'varchar', default: '1970-01-01' })
  date: string;

  @Column({ type: 'timestamp' })
  appointment_time: Date;

  @Column({ default: 'PENDING' })
  status: string;

  @Column({ type: 'varchar' })
  reason: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => UsersEntity, (user) => user.appointmentsAsUser, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id' }) // ✅ to‘g‘rilandi
  user: UsersEntity;

  @ManyToOne(() => UsersEntity, (user) => user.appointmentsAsDoctor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctor_id' }) // bu to‘g‘ri
  doctor: UsersEntity;
}

