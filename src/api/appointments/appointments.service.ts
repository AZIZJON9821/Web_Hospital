import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentsEntity } from 'src/core/entity/appointments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentsService {
  constructor(@InjectRepository(AppointmentsEntity) private readonly repo: Repository<AppointmentsEntity>) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      const appointment = this.repo.create(createAppointmentDto);
      await this.repo.save(appointment);
      return appointment;
    } catch (error) {
      throw new InternalServerErrorException('Error creating appointment', error);
    }
  }
  async findByDoctor(doctorId: number) {
    return this.repo.find({
      where: { doctor_id: doctorId },
      relations: ['patient'],
    });
  }

async cancelById(id: number, userId: number) {
  const appointment = await this.repo.findOne({
    where: { id, patient_id: userId },
  });

  if (!appointment) {
    throw new NotFoundException('Uchrashuv topilmadi yoki sizga tegishli emas');
  }

  await this.repo.remove(appointment);
}



async findTodayAppointments(dateStr: string) {
  return this.repo.find({
    where: { date: dateStr, status: 'PENDING' },
    relations: ['doctor', 'user'],
  });
}


  async findAll() {
    try {
      return await this.repo.find({
        select: ['id', 'patient_id', 'doctor_id', 'appointment_time', 'status', 'reason'],
        order: { created_at: 'DESC' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving appointments', error);
    }
  }

  async findOne(id: number) {
    try {
      const appointment = await this.repo.findOne({
        where: { id },
        select: ['id', 'patient_id', 'doctor_id', 'appointment_time', 'status', 'reason'],
      });
      if (!appointment) {
        throw new NotFoundException('Appointment not found');
      }
      return appointment;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving appointment', error);
    }
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    try {
      const appointment = await this.repo.preload({
        id,
        ...updateAppointmentDto,
      });
      if (!appointment) {
        throw new NotFoundException('Appointment not found');
      }
      return appointment;
    } catch (error) {
      throw new InternalServerErrorException('Error updating appointment', error);
    }
  }

  async remove(id: number) {
    try {
      const appointment = await this.repo.findOne({ where: { id } });
      if (!appointment) {
        throw new NotFoundException('Appointment not found');
      }
      await this.repo.delete(id);
      return { message: 'Appointment successfully deleted' };
    } catch (error) {
      throw new InternalServerErrorException('Error deleting appointment', error);
    }
  }

async findByUserId(userId: number) {
  return this.repo.find({
    where: { user: { id: userId } },
    relations: ['doctor', 'user'],
    order: { appointment_time: 'ASC' },
  });
}


}


