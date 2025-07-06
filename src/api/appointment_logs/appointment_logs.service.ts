import { HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAppointmentLogDto } from './dto/create-appointment_log.dto';
import { UpdateAppointmentLogDto } from './dto/update-appointment_log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment_logsEntity } from 'src/core/entity/appointment_logs.entity';
import { AppointmentsService } from 'src/api/appointments/appointments.service';
import { UserService } from 'src/api/users/users.service';

@Injectable()
export class AppointmentLogsService {
  constructor(
    @InjectRepository(Appointment_logsEntity)
    private readonly repo: Repository<Appointment_logsEntity>,
    private readonly appointmentsService: AppointmentsService,
    private readonly usersService: UserService,
  ) {}

  async create(createAppointmentLogDto: CreateAppointmentLogDto) {
    try {
      const appointment = await this.appointmentsService.findOne(createAppointmentLogDto.appointment_id);
      if (!appointment) {
        throw new NotFoundException('Appointment not found');
      }
      const user = await this.usersService.findOne(createAppointmentLogDto.changed_by);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const appoinments_logs = this.repo.create(createAppointmentLogDto);
      await this.repo.save(appoinments_logs);
      return appoinments_logs;
    } catch (error) {
        console.error('Xatolik appointmentLogsService.create da:', error); // 👉 bu yer

  if (error instanceof HttpException) {
    throw error; // ✅ HttpException'ni o‘zgartirmasdan tashlang
  }
  throw new InternalServerErrorException('Something went wrong');    }
  }

  async findAll() {
    try {
      const appoinments_logs = await this.repo.find({
        select: ['id', 'appointment_id', 'status', 'changed_by', 'changed_at'],
        order: { created_at: 'DESC' },
        relations: ['appointment', 'changedBy'],
      });
      return appoinments_logs;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const appoinments_logs = await this.repo.findOne({
        where: { id },
        select: ['id', 'appointment_id', 'status', 'changed_by', 'changed_at'],
        relations: ['appointment', 'changedBy'],
      });
      if (!appoinments_logs) {
        throw new NotFoundException('Not Found');
      }
      return appoinments_logs;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateAppointmentLogDto: UpdateAppointmentLogDto) {
    try {
      const appoinments_logs = await this.repo.findOne({ where: { id }, relations: ['appointment', 'changedBy'] });
      if (!appoinments_logs) {
        throw new NotFoundException('Not Found');
      }
      await this.repo.update({ id }, updateAppointmentLogDto);
      const updateAppointmentLog = await this.repo.findOne({
        where: { id },
        select: ['id', 'appointment_id', 'status', 'changed_by', 'changed_at'],
        relations: ['appointment', 'changedBy'],
      });
      return updateAppointmentLog;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const appoinments_logs = await this.repo.findOne({ where: { id }, relations: ['appointment', 'changedBy'] });
    if (!appoinments_logs) {
      throw new NotFoundException('Not Found');
    }
    await this.repo.delete({ id });
    return { message: 'success' };
  }
}

