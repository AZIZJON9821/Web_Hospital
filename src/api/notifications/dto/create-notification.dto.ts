import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNotificationDto {
    @ApiProperty({ example: 1, description: 'The user id of the notification' })
    @IsNotEmpty()
    @IsNumber()
    user_id: number;
    
    @ApiProperty({ example: 'Notification message', description: 'The message content of the notification' })
    @IsNotEmpty()
    @IsString()
    message: string;

    @ApiProperty({ example: false, description: 'Indicates if the notification has been read' })
    @IsNotEmpty()
    @IsBoolean()
    is_read: boolean;
}

