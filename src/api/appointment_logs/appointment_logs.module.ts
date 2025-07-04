import { Module } from '@nestjs/common';
import { AppointmentLogsService } from './appointment_logs.service';
import { AppointmentLogsController } from './appointment_logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment_logsEntity } from 'src/core/entity/appointment_logs.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Appointment_logsEntity])],
  controllers: [AppointmentLogsController],
  providers: [AppointmentLogsService],
})
export class AppointmentLogsModule {}
