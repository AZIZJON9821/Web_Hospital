import { Module } from '@nestjs/common';
import { DashboardMetricsService } from './dashboard_metrics.service';
import { DashboardMetricsController } from './dashboard_metrics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dashboard_metricsEntity } from 'src/core/entity/dashboard_metrics.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Dashboard_metricsEntity])],
  controllers: [DashboardMetricsController],
  providers: [DashboardMetricsService],
})
export class DashboardMetricsModule {}
