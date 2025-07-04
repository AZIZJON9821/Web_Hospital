import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentLogsService } from './appointment_logs.service';
import { CreateAppointmentLogDto } from './dto/create-appointment_log.dto';
import { UpdateAppointmentLogDto } from './dto/update-appointment_log.dto';

@Controller('appointment-logs')
export class AppointmentLogsController {
  constructor(private readonly appointmentLogsService: AppointmentLogsService) {}

  @Post()
  create(@Body() createAppointmentLogDto: CreateAppointmentLogDto) {
    return this.appointmentLogsService.create(createAppointmentLogDto);
  }

  @Get()
  findAll() {
    return this.appointmentLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentLogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentLogDto: UpdateAppointmentLogDto) {
    return this.appointmentLogsService.update(+id, updateAppointmentLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentLogsService.remove(+id);
  }
}
