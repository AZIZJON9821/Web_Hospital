import { Module } from '@nestjs/common';
import { AppointmentLogsService } from './appointment_logs.service';
import { AppointmentLogsController } from './appointment_logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment_logsEntity } from 'src/core/entity/appointment_logs.entity';
import { AppointmentsService } from '../appointments/appointments.service';
import { AppointmentsModule } from '../appointments/appointments.module';
import { UserModule } from '../users/users.module';
import { AuthGuard } from '../common/guards';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[AuthModule, UserModule,AppointmentsModule,TypeOrmModule.forFeature([Appointment_logsEntity])],
  controllers: [AppointmentLogsController],
  providers: [AppointmentLogsService ],
    exports: [AppointmentLogsService], 

})
export class AppointmentLogsModule {}
