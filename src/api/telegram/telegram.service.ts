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
          `📅 Bugun soat ${a.appointment_time.toLocaleTimeString()} da shifokor ${a.doctor?.full_name} bilan uchrashuv bor.`,
        );
      }
    }
  }

  async handleRegistration(ctx: Context) {
    const chatId = ctx.chat?.id;
    if (!chatId) return;
    this.setSession(chatId, { type: 'register', step: 'full_name', data: {} });
    await ctx.reply('👤 To‘liq ismingizni kiriting:');
  }

  async handleLogin(ctx: Context) {
    const chatId = ctx.chat?.id;
    if (!chatId) return;
    this.setSession(chatId, { type: 'login', step: 'email', data: {} });
    await ctx.reply('📧 Emailingizni kiriting:');
  }

  async handleAppointment(ctx: Context) {
    const chatId = ctx.chat?.id;
    if (!chatId) return;

    const user = await this.usersService.findByTelegramId(chatId);
    if (!user) return await ctx.reply('❗️Avval login qiling.');

    const doctors = await this.usersService.findAllDoctors();
    if (!doctors.length) return await ctx.reply('❗️Shifokorlar topilmadi.');

    this.setSession(chatId, {
      type: 'appointment',
      step: 'doctor_select',
      data: { doctors, patient_id: user.id },
    });

    let reply = '🩺 Shifokorlar:\n\n';
    for (const d of doctors) {
      reply += `🧑‍⚕️ ${d.full_name} (${d.specialization ?? 'No specialization'})\n`;
    }
    reply += '\nShifokor ismini kiriting:';
    await ctx.reply(reply);
  }

  private async createUser(ctx: Context, data: any) {
    try {
      const chatId = ctx.chat?.id;
      if (!chatId) return;

      data.telegram_chat_id = chatId;
      const { data: createdUser } = await this.usersService.create(data);

      await ctx.reply('✅ Ro‘yxatdan o‘tdingiz!');
    } catch (err) {
      console.error(err);
      await ctx.reply('❌ Ro‘yxatdan o‘tishda xatolik.');
    } finally {
      const chatId = ctx.chat?.id;
      if (chatId) this.sessions.delete(chatId);
    }
  }

  async onMessage(ctx: Context) {
    const chatId = ctx.chat?.id;
    const message = ctx.message?.['text'];
    if (!chatId || !message) return;

    let session = this.sessions.get(chatId);

    // Agar session yo'q bo‘lsa va foydalanuvchi login bo‘lgan bo‘lsa, session tiklanadi
    if (!session) {
      const user = await this.usersService.findByTelegramId(chatId);
      if (user) {
        session = {
          type: 'logged_in',
          data: { user_id: user.id },
        };
        this.setSession(chatId, session);
      } else {
        return await ctx.reply('❗️Avval login qiling.');
      }
    }

    const { type, step, data } = session;

    // CANCEL
    if (type === 'cancel' && step === 'awaiting_id') {
      const appointmentId = parseInt(message.trim());
      const user = await this.usersService.findByTelegramId(chatId);
      if (!user) return await ctx.reply('❗️Login qiling.');

      try {
        await this.appointmentsService.cancelById(appointmentId, user.id);
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
          await this.usersService.updateTelegramChatId(user.id, chatId);
          this.setSession(chatId, {
            type: 'logged_in',
            data: { user_id: user.id },
          });
          await ctx.reply(`✅ Xush kelibsiz, ${user.full_name}!`);
        }
      }
    }

    // REGISTRATION
    if (type === 'register') {
      if (step === 'full_name') {
        data.full_name = message;
        this.setSession(chatId, { type, step: 'email', data });
        await ctx.reply('📧 Emailingizni kiriting:');
      } else if (step === 'email') {
        data.email = message;
        this.setSession(chatId, { type, step: 'password', data });
        await ctx.reply('🔐 Parolingizni kiriting:');
      } else if (step === 'password') {
        data.password = message;
        this.setSession(chatId, { type, step: 'phone', data });
        await ctx.reply('📱 Telefon raqamingizni kiriting:');
      } else if (step === 'phone') {
        data.phone = message;
        this.setSession(chatId, { type, step: 'role', data });
        await ctx.reply('👤 Roli: USER yoki DOCTOR deb kiriting:');
      } else if (step === 'role') {
        data.role = message.toUpperCase();
        if (data.role === 'DOCTOR') {
          this.setSession(chatId, { type, step: 'specialization', data });
          await ctx.reply('💊 Mutaxassislikni kiriting:');
        } else {
          await this.createUser(ctx, data);
        }
      } else if (step === 'specialization') {
        data.specialization = message;
        await this.createUser(ctx, data);
      }
    }

    // APPOINTMENT
    if (type === 'appointment') {
      if (step === 'doctor_select') {
        const doctor = data.doctors.find(
          (d) => d.full_name.toLowerCase() === message.toLowerCase(),
        );
        if (!doctor)
          return await ctx.reply('❌ Shifokor topilmadi. Qaytadan urinib ko‘ring.');

        data.doctor_id = doctor.id;
        this.setSession(chatId, { type, step: 'reason', data });
        await ctx.reply('📝 Uchrashuv sababini kiriting:');
      } else if (step === 'reason') {
        data.reason = message;
        this.setSession(chatId, { type, step: 'date', data });
        await ctx.reply('📅 Uchrashuv vaqtini kiriting (YYYY-MM-DD HH:mm):');
      } else if (step === 'date') {
        const date = new Date(message);
        if (isNaN(date.getTime())) {
          return await ctx.reply('❌ Sana noto‘g‘ri. Formatga rioya qiling.');
        }

        await this.appointmentsService.create({
          doctor_id: data.doctor_id,
          patient_id: data.patient_id,
          reason: data.reason,
          appointment_time: date,
          date: date.toISOString(),
          status: 'PENDING',
        });

        this.sessions.delete(chatId);
        await ctx.reply('✅ Uchrashuv muvaffaqiyatli saqlandi!');
      }
    }
  }
}
