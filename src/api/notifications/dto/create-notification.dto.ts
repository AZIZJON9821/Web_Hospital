import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsNotEmpty()
    @IsNumber()
    user_id:number;
    
    @IsNotEmpty()
    @IsString()
    message:string;

    @IsNotEmpty()
    @IsBoolean()
    is_read:boolean;
}
