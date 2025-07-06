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
import { DashboardMetricsService } from './dashboard_metrics.service';
import { CreateDashboardMetricDto } from './dto/create-dashboard_metric.dto';
import { UpdateDashboardMetricDto } from './dto/update-dashboard_metric.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorator';
import { UserRoles } from '../users/enums';

@ApiBearerAuth()
@ApiTags('Dashboard Metrics')
@UseGuards(AuthGuard, RolesGuard)
@Controller('dashboard-metrics')
export class DashboardMetricsController {
  constructor(
    private readonly dashboardMetricsService: DashboardMetricsService,
  ) {}

  @Roles(UserRoles.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Yangi dashboard metrikasini yaratish (Admin)' })
  create(@Body() createDashboardMetricDto: CreateDashboardMetricDto) {
    return this.dashboardMetricsService.create(createDashboardMetricDto);
  }

  @Roles(UserRoles.ADMIN, UserRoles.DOCTOR)
  @Get()
  @ApiOperation({ summary: 'Barcha dashboard metrikalarni olish (Admin/Doctor)' })
  findAll() {
    return this.dashboardMetricsService.findAll();
  }

  @Roles(UserRoles.ADMIN, UserRoles.DOCTOR)
  @Get(':id')
  @ApiOperation({ summary: 'ID orqali metrikani olish (Admin/Doctor)' })
  findOne(@Param('id') id: string) {
    return this.dashboardMetricsService.findOne(+id);
  }

  @Roles(UserRoles.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Metrikani yangilash (Admin)' })
  update(
    @Param('id') id: string,
    @Body() updateDashboardMetricDto: UpdateDashboardMetricDto,
  ) {
    return this.dashboardMetricsService.update(+id, updateDashboardMetricDto);
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Metrikani o‘chirish (Admin)' })
  remove(@Param('id') id: string) {
    return this.dashboardMetricsService.remove(+id);
  }

  @Roles(UserRoles.ADMIN, UserRoles.DOCTOR)
  @Get('user/:userId')
  @ApiOperation({ summary: 'Foydalanuvchi ID orqali metrikani olish (Admin/Doctor)' })
  findByUser(@Param('userId') userId: string) {
    return this.dashboardMetricsService.findOne(+userId);
  }
}
