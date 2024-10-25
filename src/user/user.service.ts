import { Injectable, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateUserDto from './dto/create_user.dto';
import { CustomException } from 'src/common/exception/CustomException';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        user_email: createUserDto.user_email,
      },
    });

    if (user) {
      throw new CustomException('User already exists', HttpStatus.NOT_FOUND);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.user_password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        user_name: createUserDto.user_name,
        user_email: createUserDto.user_email,
        user_password: hashedPassword,
      },
    });

    return this.authService.generateToken({
      user_name: newUser.user_name,
      user_email: newUser.user_email,
    });
  }

  async login(createUserDto: Prisma.UserCreateInput) {
    const user = await this.prisma.user.findFirst({
      where: {
        user_email: createUserDto.user_email,
      },
    });

    if (!user) {
      throw new CustomException('User not exist', HttpStatus.NOT_FOUND);
    }

    const isPasswordMatch = await bcrypt.compare(
      createUserDto.user_password,
      user.user_password,
    );

    if (!isPasswordMatch) {
      throw new CustomException(
        'Password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.authService.generateToken({
      user_name: user.user_name,
      user_email: user.user_email,
    });

    return { token };
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        user_email: email,
      },
    });

    if (!user) {
      throw new CustomException('User not exist', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(email: string, updateUserDto: Prisma.UserUpdateInput) {
    const user = await this.findOne(email);

    return await this.prisma.user.update({
      where: {
        user_id: user.user_id,
      },
      data: updateUserDto,
    });
  }

  async remove(email: string) {
    const user = await this.findOne(email);

    return await this.prisma.user.delete({
      where: {
        user_id: user.user_id,
      },
    });
  }
}
