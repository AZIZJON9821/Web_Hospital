import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorator';
import { UserRoles } from '../users/enums';

@ApiBearerAuth()
@ApiTags('Appointments')
@UseGuards(AuthGuard, RolesGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Roles(UserRoles.ADMIN, UserRoles.USER)
  @Post()
  @ApiOperation({ summary: 'Yangi appointment yaratish (User, Admin)' })
  @ApiResponse({ status: 201, description: 'Appointment created' })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Roles(UserRoles.ADMIN, UserRoles.DOCTOR)
  @Get()
  @ApiOperation({ summary: 'Barcha appointmentlarni olish (Admin, Doctor)' })
  @ApiResponse({ status: 200, description: 'List of appointments' })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Roles(UserRoles.ADMIN, UserRoles.DOCTOR)
  @Get(':id')
  @ApiOperation({ summary: 'Appointmentni ID bo‘yicha olish (Admin, Doctor)' })
  @ApiResponse({ status: 200, description: 'Appointment found' })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Roles(UserRoles.ADMIN, UserRoles.DOCTOR)
  @Patch(':id')
  @ApiOperation({ summary: 'Appointmentni tahrirlash (Admin, Doctor)' })
  @ApiResponse({ status: 200, description: 'Appointment updated' })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Appointmentni o‘chirish (Admin)' })
  @ApiResponse({ status: 200, description: 'Appointment deleted' })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}
