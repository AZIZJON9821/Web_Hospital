import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsEntity } from 'src/core/entity/appointments.entity';
import { Appointment_logsEntity } from 'src/core/entity/appointment_logs.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/users.module';


@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forFeature([AppointmentsEntity, Appointment_logsEntity])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],

})
export class AppointmentsModule {}
