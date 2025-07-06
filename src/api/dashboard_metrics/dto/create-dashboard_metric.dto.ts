import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDashboardMetricDto {
    @ApiProperty({
        example: 1,
        description: 'The user id of the dashboard metric',
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    user_id:number;

    @ApiProperty({
        example: 'temperature',
        description: 'The type of the dashboard metric',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    type:string;

    
    @ApiProperty({
        example: 36.5,
        description: 'The value of the dashboard metric',
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    value:number;

    @ApiProperty({
        example: '2022-01-01 12:00:00',
        description: 'The recorded at of the dashboard metric',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    recorded_at:string;
}

