import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorator';
import { UserRoles } from '../users/enums';

@ApiBearerAuth()
@ApiTags('Schedules')
@UseGuards(AuthGuard, RolesGuard)
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Roles(UserRoles.ADMIN, UserRoles.USER)
  @Post()
  @ApiOperation({ summary: 'Yangi jadval yaratish' })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Roles(UserRoles.ADMIN, UserRoles.USER, UserRoles.DOCTOR)
  @Get()
  @ApiOperation({ summary: 'Barcha jadvallarni olish' })
  findAll() {
    return this.schedulesService.findAll();
  }

  @Roles(UserRoles.ADMIN, UserRoles.USER, UserRoles.DOCTOR)
  @Get(':id')
  @ApiOperation({ summary: 'ID orqali jadvalni olish' })
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(+id);
  }

  @Roles(UserRoles.ADMIN, UserRoles.USER)
  @Patch(':id')
  @ApiOperation({ summary: 'Jadvalni tahrirlash' })
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.schedulesService.update(+id, updateScheduleDto);
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Jadvalni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(+id);
  }
}

