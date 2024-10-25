import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import CreateUserDto from './dto/create_user.dto';
import { createSuccessResponse } from 'src/common/responses';
import { Request, request } from 'express';
import { JwtAuthGuard } from 'src/gurard/jwt_guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return createSuccessResponse('User register successfully', user);
  }

  @Post('login')
  async login(@Body() createUserDto: Prisma.UserCreateInput) {
    const token = await this.userService.login(createUserDto);
    return createSuccessResponse('User login successfully', token);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return createSuccessResponse('All User Fetched Successfully', users);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  async findOne(@Param('email') email: string) {
    const user = await this.userService.findOne(email);
    return createSuccessResponse('User Fetched Successfully', user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':email')
  async update(
    @Param('email') email: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    const user = await this.userService.update(email, updateUserDto);
    return createSuccessResponse('User Updated Successfully', user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':email')
  async remove(@Param('email') email: string) {
    const user = await this.userService.remove(email);
    return createSuccessResponse('User Updated Successfully', user);
  }
}
