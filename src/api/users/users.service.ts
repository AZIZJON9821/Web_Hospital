import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/core/entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UsersEntity)private readonly repo:Repository<UsersEntity>){ }

  async create(createUserDto: CreateUserDto) {
    try {
      let {full_name,phone,password}=createUserDto
      const exists=await this.repo.find({where:{full_name:createUserDto.full_name,
        password:createUserDto.password,
        email:createUserDto.email,
        phone:createUserDto.phone
      }})
    
      
      if(!exists){
        throw new NotFoundException('Not Found')
      }
      const users=await this.repo.create(createUserDto)
      await this.repo.save(users)
      return users
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
  }

  async findOne(id: number) {
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
  }

  async remove(id: number) {
  }
}
