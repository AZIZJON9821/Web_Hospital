import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDashboardMetricDto {
    @IsNotEmpty()
    @IsNumber()
    user_id:number;

    @IsNotEmpty()
    @IsString()
    type:string;

    
    @IsNotEmpty()
    @IsNumber()
    value:number;

    @IsNotEmpty()
    @IsString()
    recorded_at:string;
}
