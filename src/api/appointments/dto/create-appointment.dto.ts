import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAppointmentDto {
    @ApiProperty({description: 'patient id', example: 1})
    @IsNotEmpty()
    @IsNumber()
    patient_id:number;

    @ApiProperty({description: 'doctor id', example: 1})
    @IsNotEmpty()
    @IsNumber()
    doctor_id:number;
    
    @ApiProperty({description: 'date', example: '2022-01-01'})
    @IsNotEmpty()
    @IsString()
    @IsDateString()

    date: string;   
    
    @ApiProperty({description: 'appointment time', example: '2022-01-01 12:00:00'})
    @IsNotEmpty()
    @IsString()
    appointment_time:Date;

    @ApiProperty({description: 'status', example: 'pending'})
    @IsNotEmpty()
    @IsString()
    status:string;
    
    @ApiProperty({description: 'reason', example: 'check up'})
    @IsNotEmpty()
    @IsString()
    reason:string;
}

