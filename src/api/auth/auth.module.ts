import {  UsersEntity } from 'src/core/entity/users.entity';
import { AuthGuard } from './../common/guards/auth.guard';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([UsersEntity]),
    JwtModule.register({
       secret: 'azizjon' ,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,AuthGuard],
  exports: [AuthService,AuthGuard,  JwtModule],
})
export class AuthModule {}

