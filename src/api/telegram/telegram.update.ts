// telegram.update.ts
import { Update, Ctx, Start, Help, Command, On } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { TelegramService } from './telegram.service';
import { AppointmentsService } from '../appointments/appointments.service';
import { UserService } from '../users/users.service';

@Update()
export class TelegramUpdate {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly appointmentsService: AppointmentsService,
    private readonly userService: UserService,
  ) {}

  @Start()
  async startCommand(@Ctx() ctx: Context) {
    await ctx.reply(
      '👋 Assalomu alaykum!\n\n/register - Ro‘yxatdan o‘tish\n/login - Kirish\n/appointment - Navbat olish\n/myappointments - Uchrashuvlarim\n/cancel - Bekor qilish'
    );
  }

  @Help()
  async helpCommand(@Ctx() ctx: Context) {
    await ctx.reply('/register, /login, /appointment, /myappointments, /cancel buyrug‘larini ishlating.');
  }

  @Command('register')
  async registerCommand(@Ctx() ctx: Context) {
    await this.telegramService.handleRegistration(ctx);
  }

  @Command('login')
  async loginCommand(@Ctx() ctx: Context) {
    await this.telegramService.handleLogin(ctx);
  }

  @Command('appointment')
  async appointmentCommand(@Ctx() ctx: Context) {
    await this.telegramService.handleAppointment(ctx);
  }

  @Command('myappointments')
  async myAppointments(@Ctx() ctx: Context) {
    const chatId = ctx.chat?.id;
    const session = this.telegramService.getSession(chatId);
    const userId = session?.data?.user_id;

    if (!userId) return await ctx.reply('❗️Iltimos, avval login qiling.');

    const user = await this.userService.findOne(userId);
    const appointments = await this.appointmentsService.findByUserId(userId);

    if (!appointments.length) return await ctx.reply('📭 Hech qanday uchrashuv yo‘q.');

    let reply = `📅 ${user?.role === 'DOCTOR' ? 'Sizga' : 'Siz'} tegishli uchrashuvlar:\n\n`;

    for (const a of appointments) {
      reply += `🔢 ID: ${a.id}\n`;
      reply += `🧑‍⚕️ Shifokor: ${a.doctor?.full_name ?? 'Noma’lum'}\n`;
      reply += `👤 Bemor: ${a.user?.full_name ?? 'Noma’lum'}\n`;
      reply += `🕒 ${a.appointment_time?.toLocaleString?.() ?? 'Noaniq vaqt'}\n`;
      reply += `📝 Sabab: ${a.reason}\n\n`;
    }

    const parts = reply.match(/[^]{1,4000}/g) ?? [];

    for (const part of parts) {
      await ctx.reply(part);
    }
  }

  @Command('cancel')
  async cancelAppointment(@Ctx() ctx: Context) {
    const chatId = ctx.chat?.id;
    if (!chatId) return await ctx.reply('❗️Xatolik: chat ID aniqlanmadi.');

    const session = this.telegramService.getSession(chatId);
    const userId = session?.data?.user_id;

    if (!userId) return await ctx.reply('❗️Iltimos, avval login qiling.');

    this.telegramService.setSession(chatId, {
      type: 'cancel',
      step: 'awaiting_id',
      data: { user_id: userId },
    });

    await ctx.reply('❌ Bekor qilmoqchi bo‘lgan uchrashuv ID sini kiriting:');
  }

  @On('text')
  async onText(@Ctx() ctx: Context) {
    await this.telegramService.onMessage(ctx);
  }
}
