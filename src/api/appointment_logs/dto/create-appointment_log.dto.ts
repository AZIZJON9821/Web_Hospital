import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAppointmentLogDto {
    @IsNumber()
    @IsNotEmpty()
    appointment_id:number;

    @IsString()
    @IsNotEmpty()
    status:string;

    @IsNumber()
    @IsNotEmpty()
    changed_by:number;

    @IsString()
    @IsNotEmpty()
    changed_at:string;
}
