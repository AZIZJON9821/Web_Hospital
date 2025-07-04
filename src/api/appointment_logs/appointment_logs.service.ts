import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAppointmentLogDto } from './dto/create-appointment_log.dto';
import { UpdateAppointmentLogDto } from './dto/update-appointment_log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Repository } from 'typeorm';
import { UsersEntity } from 'src/core/entity/users.entity';
import { AppoinmentsEntity } from 'src/core/entity/appointments.entity';
import { Appointment_logsEntity } from 'src/core/entity/appointment_logs.entity';

@Injectable()
export class AppointmentLogsService {
  constructor(
    @InjectRepository(Appointment_logsEntity)
    private readonly repo: Repository<Appointment_logsEntity>,

  ) {}  
  async create(createAppointmentLogDto: CreateAppointmentLogDto) {
    try {
      const appoinments_logs=this.repo.create(createAppointmentLogDto);
      await this.repo.save(appoinments_logs)
      return appoinments_logs;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

  }

  async findAll() {
    try {
     const appoinments_logs=await this.repo.find({
      select:['id','appointment_id','status','changed_by','changed_at'],
      order:{'created_at':'DESC'}
     }) 
     return appoinments_logs;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: number) {
    try {
     const appoinments_logs=await this.repo.findOne({where:{id},
    select:['id','appointment_id','status','changed_by','changed_at']}) 
    if(!appoinments_logs){
      throw new NotFoundException("Not Found")
    }
    return appoinments_logs;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: number, updateAppointmentLogDto: UpdateAppointmentLogDto) {
    try {
      const appoinments_logs=await this.repo.findOne({where:{id},})
      if(!appoinments_logs){
        throw new NotFoundException("Not Found")
      }
      await this.repo.update({id},updateAppointmentLogDto)
      const updateAppointmentLog=await this.repo.findOne({
        where:{id},
        select:['id','appointment_id','status','changed_by','changed_at']
      })
      return updateAppointmentLog;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: number) {
    const appoinments_logs=await this.repo.findOne({where:{id},})
    if(!appoinments_logs){
      throw new NotFoundException('Not Found')
    }
    await this.repo.delete({id})
    return {message:"success"}
  }
}
