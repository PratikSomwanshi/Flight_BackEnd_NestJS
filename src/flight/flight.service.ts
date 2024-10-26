import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AirlineService } from 'src/airline/airline.service';
import { AirplaneService } from 'src/airplane/airplane.service';
import { AirportService } from 'src/airport/airport.service';
import { CustomException } from 'src/common/exception/CustomException';
import { PrismaService } from 'src/prisma/prisma.service';
import { FlightSearchDto } from './flightSearchDto/flight_search.dto';

@Injectable()
export class FlightService {
  constructor(
    private prisma: PrismaService,
    private airplaneService: AirplaneService,
    private airportService: AirportService,
    private airlineService: AirlineService,
  ) {}

  async create(createFlightDto: Prisma.FlightCreateInput) {
    const flight = await this.prisma.flight.findFirst({
      where: {
        flight_number: createFlightDto.flight_number,
      },
    });

    if (flight) {
      throw new CustomException('Flight already exists');
    }

    const airplane = await this.airplaneService.findOne(
      createFlightDto.Airplane as string,
    );

    const airline = await this.airlineService.findOne(
      createFlightDto.Airline as string,
    );

    const originAirport = await this.airportService.findOne(
      createFlightDto.OriginAirport as string,
    );

    const destinationAirport = await this.airportService.findOne(
      createFlightDto.DestinationAirport as string,
    );

    return await this.prisma.flight.create({
      data: {
        flight_number: createFlightDto.flight_number,
        departure_date: createFlightDto.departure_date,
        arrival_date: createFlightDto.arrival_date,
        OriginAirport: {
          connect: {
            airport_code: originAirport.airport_code,
          },
        },
        DestinationAirport: {
          connect: {
            airport_code: destinationAirport.airport_code,
          },
        },
        Airplane: {
          connect: {
            airplane_model: airplane.airplane_model,
          },
        },
        Airline: {
          connect: {
            airline_code: airline.airline_code,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.flight.findMany({
      include: {
        Airplane: true,
        Airline: true,
        OriginAirport: true,
        DestinationAirport: true,
      },
    });
  }

  async findOne(code: string) {
    const flight = await this.prisma.flight.findFirst({
      where: {
        flight_number: code,
      },
      include: {
        Airplane: true,
        Airline: true,
        OriginAirport: true,
        DestinationAirport: true,
      },
    });

    if (!flight) {
      throw new CustomException('Flight not found');
    }

    return flight;
  }

  async findWithFilter(filter: FlightSearchDto) {
    const { departure_date, origin, destination } = filter;

    const where: any = {
      ...(departure_date
        ? {
            departure_date: {
              gte: new Date(new Date(departure_date).setHours(0, 0, 0, 0)),
              lt: new Date(new Date(departure_date).setHours(23, 59, 59, 999)),
            },
          }
        : {}),
      ...(origin ? { OriginAirport: { airport_code: origin } } : {}),
      ...(destination
        ? { DestinationAirport: { airport_code: destination } }
        : {}),
    };

    return await this.prisma.flight.findMany({
      where,
      include: {
        Airplane: true,
        Airline: true,
        OriginAirport: true,
        DestinationAirport: true,
      },
    });
  }

  async update(model: string, updateFlightDto: Prisma.FlightUpdateInput) {
    const flight = await this.findOne(model);

    return await this.prisma.flight.update({
      where: { flight_number: flight.flight_number },
      data: updateFlightDto,
    });
  }

  async remove(code: string) {
    const flight = await this.findOne(code);

    return this.prisma.flight.delete({
      where: { flight_number: flight.flight_number },
    });
  }
}
