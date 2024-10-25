import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AirplaneService } from './airplane.service';
import { Prisma } from '@prisma/client';
import { createSuccessResponse } from 'src/common/responses';

@Controller('airplane')
export class AirplaneController {
  constructor(private readonly airplaneService: AirplaneService) {}

  @Post()
  async create(@Body() createAirplaneDto: Prisma.AirplaneCreateInput) {
    const airplane = await this.airplaneService.create(createAirplaneDto);

    return createSuccessResponse('Successfully created Airplane', airplane);
  }

  @Get()
  async findAll() {
    const airplanes = await this.airplaneService.findAll();

    return createSuccessResponse('Successfully fetched Airplane', airplanes);
  }

  @Get(':model')
  async findOne(@Param('model') model: string) {
    return await this.airplaneService.findOne(model);
  }

  @Patch(':model')
  async update(
    @Param('model') model: string,
    @Body() updateAirplaneDto: Prisma.AirplaneUpdateInput,
  ) {
    return await this.airplaneService.update(model, updateAirplaneDto);
  }

  @Delete(':model')
  async remove(@Param('model') model: string) {
    return await this.airplaneService.remove(model);
  }
}
