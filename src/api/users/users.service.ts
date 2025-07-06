import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UsersEntity } from 'src/core/entity/users.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
  ) {}

 async create(payload: CreateUserDto) {
  const existing = await this.userRepository.findOneBy({ email: payload.email });
  if (existing) {
    throw new ConflictException('Email mavjud emas yoki ro‘yxatdan o‘tgan');
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);

  const user = await this.userRepository.save({
    full_name: payload.full_name,
    email: payload.email,
    password: passwordHash,
    role: payload.role,
    phone: payload.phone,
    gender: payload.gender,
    birth_date: payload.birth_date,
    address: payload.address,
    specialization: payload.specialization,
    experience_years: payload.experience_years,
  });

  const token = this.jwtService.sign({
    userId: user.id,
    role: user.role,
  });

  return {
    token,
    data: user,
  };
}


  findAll() {
    return this.userRepository.find({
      select: ['id', 'full_name', 'email', 'role'],
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'full_name', 'email', 'role', 'password'],
    });
  }




  async update(id: number, data: UpdateUserDto) {
    try {
      return await this.userRepository.update(id, {
        full_name: data.full_name,
        phone: data.phone,
        email: data.email,
        password: data.password,
        role: data.role,
        gender : data.gender,
        birth_date: data.birth_date,
        address: data.address,
        specialization: data.specialization,
        experience_years: data.experience_years,
      });
    } catch (error) {
      if (error.code === '23505') {
        throw new NotFoundException('Bunday ID ga ega post topilmadi  add');
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      if (error.code === '23503') {
        throw new NotFoundException('Bunday ID ga ega comment topilmadi ');
      }
      throw error;
    }
  }
async findByEmail(email: string): Promise<UsersEntity | null> {
  return this.userRepository.findOne({
    where: { email },
    select: ['id', 'full_name', 'email', 'password', 'role'], // ✅ parol select qilinmoqda
  });
}



  async findAllDoctors() {
  return this.userRepository.find({
    where: { role: 'DOCTOR' },
    select: ['id', 'full_name', 'specialization'],
  });
}
async updateTelegramChatId(userId: number, chatId: number) {
  await this.userRepository.update(userId, { telegram_chat_id: chatId });
}

 async login(email: string, password: string) {
  const user = await this.userRepository.findOne({
    where: { email },
    select: ['id', 'full_name', 'email', 'password', 'role'], // ✅ BU YER MUHIM
  });

  if (!user) {
    throw new UnauthorizedException('Email yoki parol noto‘g‘ri');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new UnauthorizedException('Email yoki parol noto‘g‘ri');
  }

  return user;
}
}