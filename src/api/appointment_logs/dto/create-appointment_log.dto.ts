import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateAppointmentLogDto {
    @ApiProperty({description: 'appointment id', example: 1})
    @IsNumber()
    @IsNotEmpty()
    @IsUUID()
    appointment_id:number;

    @ApiProperty({description: 'status', example: 'pending'})
    @IsString()
    @IsNotEmpty()
    status:string;

    @ApiProperty({description: 'changed by', example: 1})
    @IsNumber()
    @IsNotEmpty()
    changed_by:number;

    @ApiProperty({description: 'changed at', example: '2022-01-01 12:00:00'})
    @IsString()
    @IsNotEmpty()
    changed_at:string;
}

