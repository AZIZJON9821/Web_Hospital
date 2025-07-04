import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMessageQueueDto {
    @IsNotEmpty()
    @IsNumber()
    user_id:number;
    
    @IsNotEmpty()
    @IsString()
    channel:string;

    @IsNotEmpty()
    @IsString()
    destination:string;
    
    @IsNotEmpty()
    @IsString()
    message:string;
    
    @IsNotEmpty()
    @IsString()
    status:string;

    @IsNotEmpty()
    @IsString()
    send_at:string
}
