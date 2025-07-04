import { scheduled } from "rxjs";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('schedule')
export class scheduleEntity{

    @PrimaryGeneratedColumn()
    id:number ;

    @Column({type:'int'})
    doctor_id:number

    @Column({type:'varchar'})
    weekday:string;

    @Column({type:'time'})
    start_time:string

    @Column({ type: 'time' })
    end_time: string;

    @CreateDateColumn()
    created_at:Date

//     @ManyToOne(() => User, user => user.schedules)
//   @JoinColumn({ name: 'doctor_id' })
//   doctor: User;
}