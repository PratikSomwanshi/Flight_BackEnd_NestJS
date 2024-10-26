import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AirlineService } from 'src/airline/airline.service';
import { CustomException } from 'src/common/exception/CustomException';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AirplaneService {
  constructor(
    private prisma: PrismaService,
    private airlineService: AirlineService,
  ) {}

  async create(createAirplaneDto: Prisma.AirplaneCreateInput) {
    const airplane = await this.prisma.airplane.findFirst({
      where: {
        airplane_model: createAirplaneDto.airplane_model,
      },
    });

    if (airplane) {
      throw new CustomException('Airplane already exists');
    }

    const airline = await this.airlineService.findOne(
      createAirplaneDto.Airline as string,
    );

    return await this.prisma.airplane.create({
      data: {
        airplane_model: createAirplaneDto.airplane_model,
        airplane_capacity: createAirplaneDto.airplane_capacity,
        Airline: {
          connect: {
            airline_code: airline.airline_code,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.airplane.findMany({
      include: {
        Airline: true,
      },
    });
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
