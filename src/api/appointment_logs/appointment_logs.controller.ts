import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AppointmentLogsService } from './appointment_logs.service';
import { CreateAppointmentLogDto } from './dto/create-appointment_log.dto';
import { UpdateAppointmentLogDto } from './dto/update-appointment_log.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard, RolesGuard } from '../common/guards';
import { Roles } from '../common/decorator';
import { UserRoles } from '../users/enums';

@ApiBearerAuth()
@ApiTags('Appointment Logs')
@UseGuards(AuthGuard, RolesGuard)
@Controller('appointment-logs')
export class AppointmentLogsController {
  constructor(
    private readonly appointmentLogsService: AppointmentLogsService,
  ) {}

  @Roles(UserRoles.ADMIN, UserRoles.DOCTOR)
  @Post()
  @ApiOperation({ summary: 'Appointment log yaratish (Admin, Doctor)' })
  async create(@Body() dto: CreateAppointmentLogDto) {
    return this.appointmentLogsService.create(dto);
  }

  @Roles(UserRoles.ADMIN, UserRoles.DOCTOR)
  @Get()
  @ApiOperation({ summary: 'Barcha loglarni olish (Admin, Doctor)' })
  findAll() {
    return this.appointmentLogsService.findAll();
  }

  @Roles(UserRoles.ADMIN, UserRoles.DOCTOR)
  @Get(':id')
  @ApiOperation({ summary: 'Logni ID orqali olish (Admin, Doctor)' })
  async findOne(@Param('id') id: string) {
    const log = await this.appointmentLogsService.findOne(+id);
    if (!log) throw new NotFoundException('Appointment log not found');
    return log;
  }

  @Roles(UserRoles.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Logni yangilash (faqat Admin)' })
  update(
    @Param('id') id: string,
    @Body() updateAppointmentLogDto: UpdateAppointmentLogDto,
  ) {
    return this.appointmentLogsService.update(+id, updateAppointmentLogDto);
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Logni o‘chirish (faqat Admin)' })
  remove(@Param('id') id: string) {
    return this.appointmentLogsService.remove(+id);
  }
}
