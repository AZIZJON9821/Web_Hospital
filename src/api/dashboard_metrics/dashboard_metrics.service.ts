import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDashboardMetricDto } from './dto/create-dashboard_metric.dto';
import { UpdateDashboardMetricDto } from './dto/update-dashboard_metric.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dashboard_metricsEntity } from 'src/core/entity/dashboard_metrics.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardMetricsService {
  constructor(@InjectRepository(Dashboard_metricsEntity)private readonly repo:Repository<Dashboard_metricsEntity>) { }

  async create(createDashboardMetricDto: CreateDashboardMetricDto) {
    try {
      const dashboard=this.repo.create(createDashboardMetricDto)
      await this.repo.save(dashboard)
      return dashboard
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  
  }

  async findAll() {
    try {
      const dashboard=await this.repo.find({
        select:['id','user_id','type','value','recorded_at'],
        order:{'created_at':'DESC'}
      })
      return dashboard;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: number) {
    try {
      const dashboard=await this.repo.findOne({where:{id},
      select:['id','user_id','type','value','recorded_at']})
      if(!dashboard){
        throw new NotFoundException("Not Found")
      }
      return dashboard;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: number, updateDashboardMetricDto: UpdateDashboardMetricDto) {
    try {
     const dashboard =await this.repo.findOne({where:{id},})
     if(!dashboard){
      throw new NotFoundException('Not Found')
     } 
     await this.repo.findOne({where:{id},
    select:['id','user_id','type','value','recorded_at']})
    return dashboard;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: number) {
    try {
     const dashboard=await this.repo.findOne({where:{id}})
     if(!dashboard){
      throw new  NotFoundException('Not Found')
     } 
     await this.repo.delete({id})
     return {message:'success'}
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
