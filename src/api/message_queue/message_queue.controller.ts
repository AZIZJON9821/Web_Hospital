import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageQueueService } from './message_queue.service';
import { CreateMessageQueueDto } from './dto/create-message_queue.dto';
import { UpdateMessageQueueDto } from './dto/update-message_queue.dto';

@Controller('message-queue')
export class MessageQueueController {
  constructor(private readonly messageQueueService: MessageQueueService) {}

  @Post()
  create(@Body() createMessageQueueDto: CreateMessageQueueDto) {
    return this.messageQueueService.create(createMessageQueueDto);
  }

  @Get()
  findAll() {
    return this.messageQueueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageQueueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageQueueDto: UpdateMessageQueueDto) {
    return this.messageQueueService.update(+id, updateMessageQueueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageQueueService.remove(+id);
  }
}
