import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFeedbackDto {
    @IsNotEmpty()
    @IsNumber()
    appointment_id:number;
    
    @IsNotEmpty()
    @IsNumber()
    patient_id:number;
    
    @IsNotEmpty()
    @IsNumber()
    rating:number;

    @IsNotEmpty()
    @IsString()
    comment:string;
    
}
