import { PartialType } from '@nestjs/mapped-types';
import { CreateDashboardMetricDto } from './create-dashboard_metric.dto';

export class UpdateDashboardMetricDto extends PartialType(CreateDashboardMetricDto) {}
