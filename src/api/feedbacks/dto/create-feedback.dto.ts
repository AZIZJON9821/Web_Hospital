import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFeedbackDto {
    @ApiProperty({description: 'appointment id', example: 1})
    @IsNotEmpty()
    @IsNumber()
    appointment_id:number;
    
    @ApiProperty({description: 'patient id', example: 1})
    @IsNotEmpty()
    @IsNumber()
    patient_id:number;
    
    @ApiProperty({description: 'rating', example: 5})
    @IsNotEmpty()
    @IsNumber()
    rating:number;

    @ApiProperty({description: 'comment', example: 'good doctor'})
    @IsNotEmpty()
    @IsString()
    comment:string;
    
}

