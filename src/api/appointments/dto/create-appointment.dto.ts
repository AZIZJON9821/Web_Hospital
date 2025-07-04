import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAppointmentDto {
    @IsNotEmpty()
    @IsNumber()
    patient_id:number;

    @IsNotEmpty()
    @IsNumber()
    doctor_id:number;
    
    @IsNotEmpty()
    @IsString()
    appointment_time:string;

    @IsNotEmpty()
    @IsString()
    status:string;
    
    @IsNotEmpty()
    @IsString()
    reason:string;
}
