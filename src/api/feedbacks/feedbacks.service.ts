import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedbacks } from 'src/core/entity/feedbacks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbacksService {
  constructor(@InjectRepository(Feedbacks)private readonly repo:Repository<Feedbacks>){ }

  async create(createFeedbackDto: CreateFeedbackDto) {
    try {
      const feedback=this.repo.create(createFeedbackDto)
      await this.repo.save(feedback)
      return feedback;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
     const feedbacks=await this.repo.find({
      select:['id','patient_id','rating','comment'],
      order:{'created_at':'DESC'}
     }) 
     return feedbacks
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

  }

  async findOne(id: number) {
    try {
      const feedback=await this.repo.findOne({where:{id},
      select:['id','patient_id','rating','comment']})
      if(!feedback){
        throw new NotFoundException('Not Found')
      }
      return feedback
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    try {
      const feedback=await this.repo.findOne({where:{id},})
        if(!feedback){
          throw new NotFoundException('Not Found')
        }
        await this.repo.findOne({where:{id},
        select:['id','patient_id','rating','comment']})
        return feedback
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: number) {
    try {
      const feedback=await this.repo.findOne({where:{id},})
        if(!feedback){
          throw new NotFoundException('Not Found')
        }
        await this.repo.delete({id})
        return  {message:'success'}
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
