import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramUpdate } from './telegram.update';
import { TelegramService } from './telegram.service';
import { UserModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { AppointmentsModule } from '../appointments/appointments.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: process.env.BOT_TOKEN || '7642442090:AAH66Ybmp8ZWNslq4QO52u9oWcLLTlHYxxc', 
      }),
    }),
    UserModule,
    AuthModule,
    AppointmentsModule,
  ],
  providers: [TelegramUpdate, TelegramService],
})
export class TelegramModule {}
