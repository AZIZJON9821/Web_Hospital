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
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorator';
import { UserRoles } from '../users/enums';

@ApiBearerAuth()
@ApiTags('Feedbacks')
@UseGuards(AuthGuard, RolesGuard)
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Roles(UserRoles.USER, UserRoles.DOCTOR)
  @Post()
  @ApiOperation({ summary: 'Fikr-mulohaza yaratish (User/Doctor)' })
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbacksService.create(createFeedbackDto);
  }

  @Roles(UserRoles.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Barcha fikrlarni olish (Admin)' })
  findAll() {
    return this.feedbacksService.findAll();
  }

  @Roles(UserRoles.ADMIN, UserRoles.DOCTOR)
  @Get(':id')
  @ApiOperation({ summary: 'ID orqali fikrni olish (Admin/Doctor)' })
  findOne(@Param('id') id: string) {
    return this.feedbacksService.findOne(+id);
  }

  @Roles(UserRoles.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Fikrni yangilash (Admin)' })
  update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.feedbacksService.update(+id, updateFeedbackDto);
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Fikrni o‘chirish (Admin)' })
  remove(@Param('id') id: string) {
    return this.feedbacksService.remove(+id);
  }
}
