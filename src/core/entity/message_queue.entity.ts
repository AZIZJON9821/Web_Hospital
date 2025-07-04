import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('message_queue')
export class Message_queueEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'int'})
    user_id:number;

    @Column({type:'varchar'})
    channel:string;

    @Column({type:'varchar'})
    destination:string;

    @Column({type:'varchar'})
    message:string;

    @Column({type:'varchar'})
    status:string;

    @Column({type:'timestamp'})
    send_at:string;

    @CreateDateColumn()
    created_at:Date

    // @ManyToOne(() => User, user => user.messages)
    // @JoinColumn({ name: 'user_id' })
    // user: User;
}