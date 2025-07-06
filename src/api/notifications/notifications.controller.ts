import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorator';
import { UserRoles } from '../users/enums';

@ApiBearerAuth()
@ApiTags('Notifications')
@UseGuards(AuthGuard, RolesGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Roles(UserRoles.ADMIN, UserRoles.USER, UserRoles.DOCTOR)
  @Post()
  @ApiOperation({ summary: 'Yangi bildirishnoma yaratish' })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Roles(UserRoles.ADMIN, UserRoles.USER, UserRoles.DOCTOR)
  @Get()
  @ApiOperation({ summary: 'Barcha bildirishnomalarni olish' })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Roles(UserRoles.ADMIN, UserRoles.USER, UserRoles.DOCTOR)
  @Get(':id')
  @ApiOperation({ summary: 'ID orqali bildirishnoma olish' })
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Roles(UserRoles.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Bildirishnomani yangilash (faqat ADMIN)' })
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Bildirishnomani o‘chirish (faqat ADMIN)' })
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
