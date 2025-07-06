import { Module } from '@nestjs/common';
import { DashboardMetricsService } from './dashboard_metrics.service';
import { DashboardMetricsController } from './dashboard_metrics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dashboard_metricsEntity } from 'src/core/entity/dashboard_metrics.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dashboard_metricsEntity]),
    AuthModule,
    UserModule,
  ],
  controllers: [DashboardMetricsController],
  providers: [DashboardMetricsService],
  exports: [DashboardMetricsService],
})
export class DashboardMetricsModule {}
