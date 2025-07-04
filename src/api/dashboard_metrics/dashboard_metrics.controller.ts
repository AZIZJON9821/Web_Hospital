import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DashboardMetricsService } from './dashboard_metrics.service';
import { CreateDashboardMetricDto } from './dto/create-dashboard_metric.dto';
import { UpdateDashboardMetricDto } from './dto/update-dashboard_metric.dto';

@Controller('dashboard-metrics')
export class DashboardMetricsController {
  constructor(private readonly dashboardMetricsService: DashboardMetricsService) {}

  @Post()
  create(@Body() createDashboardMetricDto: CreateDashboardMetricDto) {
    return this.dashboardMetricsService.create(createDashboardMetricDto);
  }

  @Get()
  findAll() {
    return this.dashboardMetricsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardMetricsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDashboardMetricDto: UpdateDashboardMetricDto) {
    return this.dashboardMetricsService.update(+id, updateDashboardMetricDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardMetricsService.remove(+id);
  }
}
