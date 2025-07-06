import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
} from '@nestjs/swagger';
import { Roles } from '../common/decorator';
import { UserRoles } from './enums';
import { RolesGuard } from '../common/guards/role.guard';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Users ')
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRoles.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Foydalanuvchi yaratish ' })
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Roles(UserRoles.ADMIN ,UserRoles.DOCTOR)
  @Get()
  @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish ' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchilar royxati olindi ' })
  findAll() {
    return this.userService.findAll();
  }

  @Roles(UserRoles.ADMIN ,UserRoles.DOCTOR)
  @Get(':id')
  @ApiOperation({ summary: 'ID orqali foydalanuvchini olish ' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi topildi ' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi ' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Roles(UserRoles.ADMIN, UserRoles.USER)
  @Put(':id')
  @ApiOperation({ summary: 'Foydalanuvchini yangilash ' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi yangilandi ' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi ' })
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      throw new BadRequestException('ID noto‘g‘ri formatda. Raqam bo‘lishi kerak ');
    }
    return this.userService.update(+id, payload);
  }

  @Roles(UserRoles.ADMIN ,UserRoles.DOCTOR)
  @Delete(':id')
  @ApiOperation({ summary: 'Foydalanuvchini ochirish ' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi oʻchirildi ' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi ' })
  remove(@Param('id') id: string) {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      throw new BadRequestException('ID noto‘g‘ri formatda. Raqam bo‘lishi kerak ');
    }
    return this.userService.remove(+id);
  }
}

