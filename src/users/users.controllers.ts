import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from "express";
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { FormatResponseInterceptor } from "../common/interceptors/format-response.interceptor"
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';


@UseInterceptors(FormatResponseInterceptor)
// If required we can add the message param to pass to the interceptor
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private authService: AuthService) { }

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login( @Req() req): Promise<any> {
    return this.authService.login(req.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers(): Promise<User[]> {
    let result = await this.usersService.getUsers();
    return result;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto.email, createUserDto.age, createUserDto.userName, createUserDto.password)
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