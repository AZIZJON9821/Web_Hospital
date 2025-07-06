import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { MessageQueueModule } from './message_queue/message_queue.module';
import { DashboardMetricsModule } from './dashboard_metrics/dashboard_metrics.module';
import { SchedulesModule } from './schedules/schedules.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AppointmentLogsModule } from './appointment_logs/appointment_logs.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsEntity } from 'src/core/entity/notifications.entity';
import { Message_queueEntity } from 'src/core/entity/message_queue.entity';
import { Dashboard_metricsEntity } from 'src/core/entity/dashboard_metrics.entity';
import { scheduleEntity } from 'src/core/entity/schedules.entity';
import { Appointment_logsEntity } from 'src/core/entity/appointment_logs.entity';
import { AppointmentsEntity } from 'src/core/entity/appointments.entity';
import { Feedbacks } from 'src/core/entity/feedbacks.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { TelegramModule } from './telegram/telegram.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      url:process.env.DB_URL,
      synchronize:true,
      autoLoadEntities:true,
      entities:[NotificationsEntity,Message_queueEntity,Dashboard_metricsEntity,scheduleEntity,Appointment_logsEntity,AppointmentsEntity,Feedbacks]
    }),
    AuthModule,
    UserModule,
    SchedulesModule,
    AppointmentsModule,
    AppointmentLogsModule,
    FeedbacksModule,
    NotificationsModule,
    MessageQueueModule,
    DashboardMetricsModule,
    TelegramModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

