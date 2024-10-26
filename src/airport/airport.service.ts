import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CustomException } from 'src/common/exception/CustomException';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AirportService {
  constructor(private prisma: PrismaService) {}

  async create(createAirportDto: Prisma.AirportCreateInput) {
    const airport = await this.prisma.airport.findFirst({
      where: {
        airport_code: createAirportDto.airport_code,
      },
    });

    if (airport) {
      throw new CustomException('Airport already exists');
    }

    return await this.prisma.airport.create({
      data: {
        airport_code: createAirportDto.airport_code,
        airport_name: createAirportDto.airport_name,
      },
    });
  }

  async findAll() {
    return await this.prisma.airport.findMany();
  }

  async findOne(code: string) {
    const airport = await this.prisma.airport.findFirst({
      where: {
        airport_code: code,
      },
    });

    if (!airport) {
      throw new CustomException('Airport not found');
    }

    return airport;
  }

  async update(model: string, updateAirportDto: Prisma.AirportUpdateInput) {
    const airport = await this.findOne(model);

    return await this.prisma.airport.update({
      where: { airport_code: airport.airport_code },
      data: updateAirportDto,
    });
  }

  async remove(code: string) {
    const airport = await this.findOne(code);

    return this.prisma.airport.delete({
      where: { airport_code: airport.airport_code },
    });
  }
}
