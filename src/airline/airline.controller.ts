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
import { AirlineService } from './airline.service';

@Controller('airline')
export class AirlineController {
  constructor(private readonly airlineService: AirlineService) {}

  @Post()
  async create(@Body() createAirlineDto: Prisma.AirlineCreateInput) {
    const airline = await this.airlineService.create(createAirlineDto);

    return createSuccessResponse('Successfully created Airline', airline);
  }

  @Get()
  async findAll() {
    const airlines = await this.airlineService.findAll();

    return createSuccessResponse('Successfully fetched Airline', airlines);
  }

  @Get(':model')
  async findOne(@Param('model') model: string) {
    return await this.airlineService.findOne(model);
  }

  @Patch(':model')
  async update(
    @Param('model') model: string,
    @Body() updateAirlineDto: Prisma.AirlineUpdateInput,
  ) {
    return await this.airlineService.update(model, updateAirlineDto);
  }

  @Delete(':model')
  async remove(@Param('model') model: string) {
    return await this.airlineService.remove(model);
  }
}
