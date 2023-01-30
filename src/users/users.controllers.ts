import { Body, Controller, Delete, Get, Param, Patch, Post, Query , Req} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Request} from "express";
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { Types } from 'mongoose';
import {ObjectId} from 'mongodb';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Get()
  async getUsers(): Promise<User[]> {
      let result = await this.usersService.getUsers();
      return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.usersService.createUser(createUserDto.email, createUserDto.age, createUserDto.userName)
  }

  @Patch(':userId')
  async updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
      return this.usersService.updateUser(userId, updateUserDto);
  }

  @Post('/search-user-name/')
   async searchUser(@Req() req: Request): Promise<User[]> {
    let users = await this.usersService.searchUser(req.query.userName)
    return users
}

@Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<any> {
      return this.usersService.deleteUser(userId)
  }
}