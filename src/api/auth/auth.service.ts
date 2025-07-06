import { UserService } from '../users/users.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../core/entity/users.entity';
import { LoginDto, RegisterDto } from './dtos';
import { UserRoles } from '../users/enums/roles.enum';
import { SendOtpDto } from './dtos/send-otp.dto';
import fetch from 'node-fetch';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
      private readonly usersService: UserService

  ) {}

  async register(userData: RegisterDto) {
    await this.verifyUniqueEmail(userData.email);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = this.userRepository.create({
      full_name: userData.full_name,
      email: userData.email,
      password: hashedPassword,
      role: UserRoles.USER,
    });

    const savedUser = await this.userRepository.save(newUser);

    

    return {
      status: 'success',
      details: {
        message: 'Tokenni login qilgandan keyin olasiz 🚀',
        userInfo: {
          token: this.jwtService.sign({
            userId: savedUser.id,
            role: savedUser.role,
          }),

        },
      },
    };
  }

  async login(credentials: LoginDto) {
    const user = await this.findUserByEmail(credentials.email);

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ConflictException('Notogri parol 🔐');
    }

    const token = this.jwtService.sign({
      userId: user.id,
      role: user.role,
    });

    return { token };
  }

  async findAll() {
    return this.userRepository.find();
  }

  private async verifyUniqueEmail(email: string) {
    const existingUser = await this.userRepository.findOneBy({ email });

    if (existingUser) {
      throw new ConflictException('Email ro‘yxatdan o‘tgan');
    }
  }

  private async findUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new ConflictException('Topilmadi');
    }

    return user;
  }



  async sendOtpToEmail(emailDto: SendOtpDto) {
    const user = await this.userRepository.findOneBy({ email: emailDto.email });

    if (!user) {
      throw new ConflictException('Bunday emaildagi foydalanuvchi topilmadi');
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

    user.verificationCode = otpCode;
    await this.userRepository.save(user);

    await this.sendEmailVerificationCode(user.email, otpCode);

    return {
      status: 'jonatildi',
      message: '4 xonali OTP kod emailga yuborildi ✉️',
    };
  }

  private async sendEmailVerificationCode(email: string, code: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Hack 👨‍💻" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: '🔐 Sizning OTP kodingiz',
      text: `📝 Sizning 4 xonali OTP kodingiz: ${code}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`OTP yuborildi: ${email}`);
      console.log(`Email yuborish holati: ${info.response}`);
    } catch (error) {
      console.error('Email yuborishda xato:', error.message);
    }
  }
async validateUser(email: string, password: string) {
  const user = await this.usersService.findByEmail(email); // 👈 bu joy muhim

  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }

  return user;
}


}


