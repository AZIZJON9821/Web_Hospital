// telegram.service.ts
import { Injectable } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';
import { UserService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { AppointmentsService } from '../appointments/appointments.service';
import { Cron } from '@nestjs/schedule';
import { InjectBot } from 'nestjs-telegraf';

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
    private readonly usersService: UserService,
    private readonly authService: AuthService,
    private readonly appointmentsService: AppointmentsService,
  ) {}

  private sessions = new Map<number, any>();

  getSession(chatId: number | undefined) {
    return chatId ? this.sessions.get(chatId) : null;
  }

  setSession(chatId: number, session: any) {
    this.sessions.set(chatId, session);
  }

  async onModuleInit() {
    await this.bot.telegram.setMyCommands([
      { command: 'start', description: 'Boshlash' },
      { command: 'register', description: 'Ro‘yxatdan o‘tish' },
      { command: 'login', description: 'Tizimga kirish' },
      { command: 'appointment', description: 'Navbat olish' },
      { command: 'myappointments', description: 'Uchrashuvlarim' },
      { command: 'cancel', description: 'Uchrashuvni bekor qilish' },
    ]);
  }

  @Cron('0 8 * * *')
  async remindAppointments() {
    const today = new Date().toISOString().split('T')[0];
    const appointments = await this.appointmentsService.findTodayAppointments(today);

    for (const a of appointments) {
      const user = await this.usersService.findOne(a.patient_id);
      if (user?.telegram_chat_id) {
        await this.bot.telegram.sendMessage(
          user.telegram_chat_id,
          `📅 Bugun soat ${a.appointment_time.toLocaleTimeString()} da shifokor ${a.doctor?.full_name} bilan uchrashuv bor.`
        );
      }
    }
  }

  async handleRegistration(ctx: Context) {
    const chatId = ctx.chat?.id;
    if (!chatId) return;
    this.sessions.set(chatId, { type: 'register', step: 'full_name', data: {} });
    await ctx.reply('👤 To‘liq ismingizni kiriting:');
  }

  async handleLogin(ctx: Context) {
    const chatId = ctx.chat?.id;
    if (!chatId) return;
    this.sessions.set(chatId, { type: 'login', step: 'email', data: {} });
    await ctx.reply('📧 Emailingizni kiriting:');
  }

  async handleAppointment(ctx: Context) {
    const chatId = ctx.chat?.id;
    if (!chatId) return;
    const session = this.sessions.get(chatId);
    const userId = session?.data?.user_id;
    if (!userId) return await ctx.reply('❗️Avval login qiling.');

    const doctors = await this.usersService.findAllDoctors();
    if (!doctors.length) return await ctx.reply('❗️Shifokorlar topilmadi.');

    this.setSession(chatId, {
      type: 'appointment',
      step: 'doctor_select',
      data: { doctors, user_id: userId },
    });

    let reply = '🩺 Shifokorlar:\n\n';
    for (const d of doctors) {
      reply += `🧑‍⚕️ ${d.full_name} (${d.specialization ?? 'No specialization'})\n`;
    }
    reply += '\nShifokor ismini kiriting:';

    await ctx.reply(reply);
  }

  async onMessage(ctx: Context) {
    const chatId = ctx.chat?.id;
    const message = ctx.message?.['text'];
    if (!chatId || !message) return;

    const session = this.sessions.get(chatId);
    if (!session) return;

    const { type, step, data } = session;

    // CANCEL
    if (type === 'cancel' && step === 'awaiting_id') {
      const appointmentId = parseInt(message.trim());
      try {
        await this.appointmentsService.cancelById(appointmentId, data.user_id);
        await ctx.reply('✅ Uchrashuv bekor qilindi.');
      } catch {
        await ctx.reply('❌ Bekor qilishda xatolik.');
      }
      this.sessions.delete(chatId);
      return;
    }

    // LOGIN
    if (type === 'login') {
      if (step === 'email') {
        data.email = message;
        this.setSession(chatId, { type, step: 'password', data });
        await ctx.reply('🔑 Parolingizni kiriting:');
      } else if (step === 'password') {
        const user = await this.authService.validateUser(data.email, message);
        if (!user) {
          await ctx.reply('❌ Email yoki parol noto‘g‘ri.');
          this.sessions.delete(chatId);
        } else {
          this.setSession(chatId, { type: 'logged_in', step: null, data: { user_id: user.id } });
          await ctx.reply(`✅ Xush kelibsiz, ${user.full_name}!`);
        }
      }
    }

    // Registration and Appointment logikasi ham shu tarzda davom etadi...
  }

  private async createUser(ctx: Context, data: any) {
    try {
      await this.usersService.create(data);
      await ctx.reply('✅ Ro‘yxatdan o‘tdingiz!');
    } catch (err) {
      await ctx.reply('❌ Ro‘yxatdan o‘tishda xatolik.');
    } finally {
      const chatId = ctx.chat?.id;
      if (chatId) this.sessions.delete(chatId);
    }
  }
}
