import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppoinmentsEntity } from 'src/core/entity/appointments.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AppoinmentsEntity])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
