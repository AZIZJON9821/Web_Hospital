import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    full_name:string;

    @IsString()
    @IsNotEmpty()
    phone:string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    role:string;

    @IsString()
    @IsNotEmpty()
    gender:string;

    @IsNumber()
    @IsNotEmpty()
    birt_date:number;

    @IsString()
    @IsNotEmpty()
    address:string;

    @IsNotEmpty()
    specialization:string;
    
    @IsNumber()
    @IsNotEmpty()
    experience_years:number;
    
}
