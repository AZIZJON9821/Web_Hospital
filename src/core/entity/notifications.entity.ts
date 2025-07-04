import { count } from "console";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('notifications')
export class NotificationsEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'int'})
    user_id:number;
 
    @Column({type:'varchar'})
    message:string;

    @Column({type:'boolean'})
    is_read:boolean;

    @CreateDateColumn()
    created_at:Date

//     @ManyToOne(() => User, user => user.notifications)
//   @JoinColumn({ name: 'user_id' })
//   user: User;
}