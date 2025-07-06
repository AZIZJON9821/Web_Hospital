import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateScheduleDto {
    @ApiProperty({description: 'doctor id', example: 1})
    @IsNotEmpty()
    @IsNumber()
    doctor_id:number;
    
    @ApiProperty({description: 'weekday', example: 'Monday'})
    @IsNotEmpty()
    @IsString()
    weekday:string;
    
    @ApiProperty({description: 'start time', example: '08:00'})
    @IsNotEmpty()
    @IsString()
    start_time:string;
    
    @ApiProperty({description: 'end time', example: '18:00'})
    @IsNotEmpty()
    @IsString()
    end_time:string;
}

