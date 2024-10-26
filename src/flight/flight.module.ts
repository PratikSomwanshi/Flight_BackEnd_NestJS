import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { AirlineModule } from 'src/airline/airline.module';
import { AirportModule } from 'src/airport/airport.module';
import { AirplaneModule } from 'src/airplane/airplane.module';

@Module({
  imports: [AirlineModule, AirportModule, AirplaneModule],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
