import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createSuccessResponse } from 'src/common/responses';
import { FlightService } from './flight.service';
import { FlightSearchDto } from './flightSearchDto/flight_search.dto';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Flight')
@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  async create(@Body() createFlightDto: Prisma.FlightCreateInput) {
    const flight = await this.flightService.create(createFlightDto);

    return createSuccessResponse('Successfully created Flight', flight);
  }

  @Get()
  async findAll() {
    const flights = await this.flightService.findAll();

    return createSuccessResponse('Successfully fetched Flight', flights);
  }

  @Get('search')
  @ApiQuery({ name: 'departure_date', required: false, type: String })
  @ApiQuery({ name: 'origin', required: false, type: String })
  @ApiQuery({ name: 'destination', required: false, type: String })
  async findByDateAndAirport(@Query() query: FlightSearchDto) {
    const flights = await this.flightService.findWithFilter(query);

    return createSuccessResponse('Successfully fetched Flight', flights);
  }

  @Get(':flight_number')
  @ApiParam({ name: 'flight_number', required: true, type: String })
  async findOne(@Param('flight_number') flight_number: string) {
    const flight = await this.flightService.findOne(flight_number);
    return createSuccessResponse('Successfully fetched Flight', flight);
  }

  @Patch(':model')
  async update(
    @Param('model') model: string,
    @Body() updateFlightDto: Prisma.FlightUpdateInput,
  ) {
    return await this.flightService.update(model, updateFlightDto);
  }

  @Delete(':model')
  async remove(@Param('model') model: string) {
    return await this.flightService.remove(model);
  }
}
