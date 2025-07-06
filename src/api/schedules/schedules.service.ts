import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { scheduleEntity } from 'src/core/entity/schedules.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SchedulesService {
  constructor(@InjectRepository(scheduleEntity) private readonly repo: Repository<scheduleEntity>) {}

  async create(createScheduleDto: CreateScheduleDto) {
    try {
      const schedule = this.repo.create(createScheduleDto);
      await this.repo.save(schedule);
      return schedule;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.repo.find({
        select: ['id', 'doctor_id', 'weekday', 'start_time', 'end_time'],
        order: { created_at: 'DESC' },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const schedule = await this.repo.findOne({
        where: { id },
        select: ['id', 'doctor_id', 'weekday', 'start_time', 'end_time'],
      });
      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }
      return schedule;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    try {
      const schedule = await this.repo.preload({ id, ...updateScheduleDto });
      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }
      await this.repo.save(schedule);
      return schedule;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const schedule = await this.repo.findOne({ where: { id } });
      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }
      await this.repo.delete(id);
      return { message: 'Schedule successfully removed' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

