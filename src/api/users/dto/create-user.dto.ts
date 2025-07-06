import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../enums';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'The phone number of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
    required: true,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'secret',
    description: 'The password of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
  example: 'DOCTOR',
  enum: UserRoles, 
  description: 'The role of the user',
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    example: 'MALE',
    description: 'The gender of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'The birth year of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  birth_date: string;

  @ApiProperty({
    example: 'Tashkent, Uzbekistan',
    description: 'The address of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'Cardio',
    description: 'The specialization of the user',
    required: true,
  })
  @IsNotEmpty()
  specialization: string;

  @ApiProperty({
    example: 5,
    description: 'The experience years of the user',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  experience_years: number;
}
