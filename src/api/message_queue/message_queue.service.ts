import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMessageQueueDto } from './dto/create-message_queue.dto';
import { UpdateMessageQueueDto } from './dto/update-message_queue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message_queueEntity } from 'src/core/entity/message_queue.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageQueueService {
  constructor(@InjectRepository(Message_queueEntity)private readonly repo:Repository<Message_queueEntity>){ }

  async create(createMessageQueueDto: CreateMessageQueueDto) {
    try {
      const message=await this.repo.create(createMessageQueueDto)
      await this.repo.save(message)
      return message
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
     const message =await this.repo.find({select:[
      'id','user_id','channel','destination','message','status','send_at'
     ],
    order:{'created_at':'DESC'}})
    return message; 
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: number) {
    try {
     const message =await this.repo.findOne({where:{id},
    select:['id','user_id','channel','destination','message','status','send_at']})
    if(!message){
      throw new NotFoundException('Not Found')
    } 
    return message;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: number, updateMessageQueueDto: UpdateMessageQueueDto) {
    try {
     const message = await this.repo.findOne({where:{id}})
     if(!message){
      throw new NotFoundException('Not Found')
     } 
     await this.repo.findOne({where:{id},
    select:['id','user_id','channel','destination','message','status','send_at']})
    return message;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: number) {
    try {
     const message =await this.repo.findOne({where:{id},})
     if(!message){
      throw new NotFoundException('Not Found')
     } 
     await this.repo.delete({id})
     return {message:'success'}
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
