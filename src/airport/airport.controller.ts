import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createSuccessResponse } from 'src/common/responses';
import { AirportService } from './airport.service';

@Controller('airport')
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @Post()
  async create(@Body() createAirportDto: Prisma.AirportCreateInput) {
    const airport = await this.airportService.create(createAirportDto);

    return createSuccessResponse('Successfully created Airport', airport);
  }

  @Get()
  async findAll() {
    const airports = await this.airportService.findAll();

    return createSuccessResponse('Successfully fetched Airport', airports);
  }

  @Get(':model')
  async findOne(@Param('model') model: string) {
    return await this.airportService.findOne(model);
  }

  @Patch(':model')
  async update(
    @Param('model') model: string,
    @Body() updateAirportDto: Prisma.AirportUpdateInput,
  ) {
    return await this.airportService.update(model, updateAirportDto);
  }

  @Delete(':model')
  async remove(@Param('model') model: string) {
    return await this.airportService.remove(model);
  }
}
