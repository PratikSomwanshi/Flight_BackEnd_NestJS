import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CustomException } from 'src/common/exception/CustomException';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AirlineService {
  constructor(private prisma: PrismaService) {}

  async create(createAirlineDto: Prisma.AirlineCreateInput) {
    const airline = await this.prisma.airline.findFirst({
      where: {
        airline_code: createAirlineDto.airline_code,
      },
    });

    if (airline) {
      throw new CustomException('Airline already exists');
    }

    return await this.prisma.airline.create({
      data: {
        airline_code: createAirlineDto.airline_code,
        airline_name: createAirlineDto.airline_name,
      },
    });
  }

  async findAll() {
    return await this.prisma.airline.findMany({
      include: {
        Airplane: true,
      },
    });
  }

  async findOne(code: string) {
    const airline = await this.prisma.airline.findFirst({
      where: {
        airline_code: code,
      },
    });

    if (!airline) {
      throw new CustomException('Airline not found');
    }

    return airline;
  }

  async update(model: string, updateAirlineDto: Prisma.AirlineUpdateInput) {
    const airline = await this.findOne(model);

    return await this.prisma.airline.update({
      where: { airline_code: airline.airline_code },
      data: updateAirlineDto,
    });
  }

  async remove(code: string) {
    const airline = await this.findOne(code);

    return this.prisma.airline.delete({
      where: { airline_code: airline.airline_code },
    });
  }
}
