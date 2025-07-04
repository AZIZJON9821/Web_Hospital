import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AppoinmentsEntity } from 'src/core/entity/appointments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentsService {
  constructor(@InjectRepository(AppoinmentsEntity)private readonly repo:Repository<AppoinmentsEntity>){ }

  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      const appointment=await this.repo.create(createAppointmentDto)
      await this.repo.save(appointment)
      return appointment;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
     const appointment = await this.repo.find({
      select:['id','patient_id','doctor_id','appointment_time','status','reason'],
      order:{'created_at':'DESC'}
     }) 
     return appointment;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: number) {
    try {
     const appointment=await this.repo.findOne({where:{id},select:['id','patient_id','doctor_id','appointment_time','status','reason']}) 
     if(!appointment){
      throw new NotFoundException('Not Found')
     }
     return appointment
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    try {
     const appointment=await this.repo.findOne({where:{id},})
     if(!appointment){
      throw new NotFoundException('Not Found')
     } 
     await this.repo.findOne({where:{id},
    select:['id','patient_id','doctor_id','appointment_time','status','reason']})
    return appointment
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: number) {
    try {
     const appointment=await this.repo.findOne({where:{id},})
     if(!appointment){
      throw new NotFoundException('Not Found')
     } 
     await this.repo.delete({id})
     return {message:'success'}
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
