import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateScheduleDto {
    @IsNotEmpty()
    @IsNumber()
    doctor_id:number;
    
    @IsNotEmpty()
    @IsString()
    weekday:string;
    
    @IsNotEmpty()
    @IsString()
    start_time:string;
    
    @IsNotEmpty()
    @IsString()
    end_time:string;
}
