import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('dashboard_metrics')
export class Dashboard_metricsEntity{
    @PrimaryGeneratedColumn()
    id:number; 

    @Column({type:'int'})
    user_id:number;

    @Column({type:'varchar'})
    type:string

@Column({ type: 'numeric' }) // yoki 'float'
value: number;


    @Column({type:'date'})
    recorded_at:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

//     @ManyToOne(() => User, user => user.dashboardMetrics)
//   @JoinColumn({ name: 'user_id' })
//   user: User;
}