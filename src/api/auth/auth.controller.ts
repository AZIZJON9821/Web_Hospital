import {Controller,Post,Body,Get,OnModuleInit, UseGuards,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Protected, Roles } from '../common/decorator';
import { UserRoles } from '../users/enums/roles.enum';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from 'src/core/entity/users.entity';
import { AuthGuard, RolesGuard } from '../common/guards';
import { SendOtpDto } from './dtos/send-otp.dto';

@ApiTags('Authentication ')
@UseGuards(AuthGuard, RolesGuard)
@Controller('auth')
export class AuthController implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  @Post('register')
  @Protected(false)
  @ApiOperation({ summary: 'Create a new user account ' })
  @ApiResponse({ status: 201, description: 'User created successfully ' })
  async createUser(@Body() userData: RegisterDto) {
    return await this.authService.register(userData);
  }

  @Post('login')
  @Protected(false)
  @Roles(UserRoles.USER, UserRoles.ADMIN)
  @ApiOperation({ summary: 'Login to an existing user account ' })
  @ApiResponse({ status: 200, description: 'User logged in successfully ' })
  async authenticateUser(@Body() credentials: LoginDto) {
    return await this.authService.login(credentials);
  }

  @Post('send-otp')
  @Protected(false)
  @ApiOperation({ summary: 'Emailga 4 xonali OTP yuborish ' })
  @ApiResponse({ status: 200, description: 'OTP yuborildi' })
  async sendOtp(@Body() dto: SendOtpDto) {
    return await this.authService.sendOtpToEmail(dto);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles(UserRoles.ADMIN , UserRoles.DOCTOR)
  @Get()
  @ApiOperation({ summary: 'Get all users ' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully ' })
  async getAllUsers() {
    return await this.userRepository.find();
  }

  async seedAdmin() {
  const adminEmail = 'az@gmail.com';

  // Avval mavjud adminni topamiz
  const existingAdmin = await this.userRepository.findOne({
    where: { email: adminEmail },
  });

  // Agar mavjud bo‘lsa — o‘chiramiz
  if (existingAdmin) {
    await this.userRepository.remove(existingAdmin);
    console.log('Oldingi admin o‘chirildi');
  }

  // Endi yangisini yaratamiz
  const admin = {
    full_name: 'az',
    phone: '+998901234567',
    email: adminEmail,
    password: 'az123',
    role: UserRoles.ADMIN,
    birth_date: new Date('1990-01-01'),
    address: 'Toshkent shahri',
    specialization: 'Administrator',
    experience_years: 10,
  };

  const passwordHash = await bcrypt.hash(admin.password, 10);

  await this.userRepository.save({
    ...admin,
    password: passwordHash,
  });

  console.log('Yangi admin yaratildi');
}
}