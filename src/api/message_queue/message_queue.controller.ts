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
import { MessageQueueService } from './message_queue.service';
import { CreateMessageQueueDto } from './dto/create-message_queue.dto';
import { UpdateMessageQueueDto } from './dto/update-message_queue.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorator';
import { UserRoles } from '../users/enums';

@ApiBearerAuth()
@ApiTags('Message-queue')
@UseGuards(AuthGuard, RolesGuard)
@Controller('message-queue')
export class MessageQueueController {
  constructor(private readonly messageQueueService: MessageQueueService) {}

  @Roles(UserRoles.ADMIN, UserRoles.USER, UserRoles.DOCTOR)
  @Post()
  @ApiOperation({ summary: 'Yangi xabar navbati yaratish' })
  create(@Body() createMessageQueueDto: CreateMessageQueueDto) {
    return this.messageQueueService.create(createMessageQueueDto);
  }

  @Roles(UserRoles.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Barcha xabar navbatlarini olish (faqat admin)' })
  findAll() {
    return this.messageQueueService.findAll();
  }

  @Roles(UserRoles.ADMIN, UserRoles.DOCTOR)
  @Get(':id')
  @ApiOperation({ summary: 'ID orqali xabar navbatini olish' })
  findOne(@Param('id') id: string) {
    return this.messageQueueService.findOne(+id);
  }

  @Roles(UserRoles.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Xabar navbatini yangilash (faqat admin)' })
  update(
    @Param('id') id: string,
    @Body() updateMessageQueueDto: UpdateMessageQueueDto,
  ) {
    return this.messageQueueService.update(+id, updateMessageQueueDto);
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Xabar navbatini o‘chirish (faqat admin)' })
  remove(@Param('id') id: string) {
    return this.messageQueueService.remove(+id);
  }

  @Roles(UserRoles.ADMIN, UserRoles.USER, UserRoles.DOCTOR)
  @Get('user/:userId')
  @ApiOperation({ summary: 'Foydalanuvchi ID bo‘yicha navbatlarni olish' })
  findByUserId(@Param('userId') userId: string) {
    return this.messageQueueService.findMessageQueueByUserId(+userId);
  }
}
