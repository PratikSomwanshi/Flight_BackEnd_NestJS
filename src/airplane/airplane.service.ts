import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CustomException } from 'src/common/exception/CustomException';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AirplaneService {
  constructor(private prisma: PrismaService) {}

  async create(createAirplaneDto: Prisma.AirplaneCreateInput) {
    const airplane = await this.prisma.airplane.findFirst({
      where: {
        airplane_model: createAirplaneDto.airplane_model,
      },
    });

    if (airplane) {
      throw new CustomException('Airplane already exists');
    }

    return await this.prisma.airplane.create({
      data: createAirplaneDto,
    });
  }

  async findAll() {
    return await this.prisma.airplane.findMany();
  }

  async findOne(email: string) {
    const airplane = await this.prisma.airplane.findFirst({
      where: {
        airplane_model: email,
      },
    });

    if (!airplane) {
      throw new CustomException('Airplane not found');
    }

    return airplane;
  }

  async update(model: string, updateAirplaneDto: Prisma.AirplaneUpdateInput) {
    const airplane = await this.findOne(model);

    return await this.prisma.airplane.update({
      where: { airplane_model: model },
      data: updateAirplaneDto,
    });
  }

  async remove(model: string) {
    const airplane = await this.findOne(model);

    return this.prisma.airplane.delete({
      where: { airplane_model: airplane.airplane_model },
    });
  }
}
