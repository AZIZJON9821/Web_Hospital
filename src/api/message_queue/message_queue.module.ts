import { Module } from '@nestjs/common';
import { MessageQueueService } from './message_queue.service';
import { MessageQueueController } from './message_queue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message_queueEntity } from 'src/core/entity/message_queue.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Message_queueEntity])],
  controllers: [MessageQueueController],
  providers: [MessageQueueService],
})
export class MessageQueueModule {}
