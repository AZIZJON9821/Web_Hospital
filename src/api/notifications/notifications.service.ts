import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsEntity } from 'src/core/entity/notifications.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
  constructor(@InjectRepository(NotificationsEntity)private readonly repo:Repository<NotificationsEntity>){ }

  async create(createNotificationDto: CreateNotificationDto) {
    try {
      const notification=await this.repo.create(createNotificationDto)
      await this.repo.save(notification)
      return notification
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
     const notification=await this.repo.find({select:['id','user_id','message','is_read'],
      order:{'created_at':'DESC'}
     }) 
     return notification;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: number) {
    try {
     const notification= await this.repo.findOne({where:{id},
    select:['id','user_id','message','is_read']})
    if(!notification){
      throw new NotFoundException('Not Found')
    } 
    return notification
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    try {
     const notification=await this.repo.preload({id,...updateNotificationDto})
     if(!notification){
      throw new NotFoundException('Not Found')
     } 
     await this.repo.save(notification)
     return notification
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: number) {
    try {
     const notification=await this.repo.findOne({where:{id},})
     if(!notification){
      throw new NotFoundException('Not Found')
     } 
     await this.repo.delete({id})
     return {message:'success'}
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}

