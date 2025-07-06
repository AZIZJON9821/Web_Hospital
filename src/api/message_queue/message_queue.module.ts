import { Module } from '@nestjs/common';
import { MessageQueueService } from './message_queue.service';
import { MessageQueueController } from './message_queue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message_queueEntity } from 'src/core/entity/message_queue.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule,TypeOrmModule.forFeature([Message_queueEntity])],
  controllers: [MessageQueueController],
  providers: [MessageQueueService],
  exports: [MessageQueueService],
})
export class MessageQueueModule {}
