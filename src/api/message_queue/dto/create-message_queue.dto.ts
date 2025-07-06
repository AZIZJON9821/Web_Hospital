import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMessageQueueDto {
    @ApiProperty({
        example: 1,
        description: 'The user id of the message queue',
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    user_id:number;
    
    @ApiProperty({
        example: 'SMS',
        description: 'The channel of the message queue',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    channel:string;

    @ApiProperty({
        example: '+1234567890',
        description: 'The destination of the message queue',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    destination:string;
    
    @ApiProperty({
        example: 'Hello from nestjs',
        description: 'The message of the message queue',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    message:string;
    
    @ApiProperty({
        example: 'pending',
        description: 'The status of the message queue',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    status:string;

    @ApiProperty({
        example: '2022-01-01 12:00:00',
        description: 'The send at of the message queue',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    send_at:string
}

