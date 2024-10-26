import { Module } from '@nestjs/common';
import { AirplaneService } from './airplane.service';
import { AirplaneController } from './airplane.controller';
import { AirlineModule } from 'src/airline/airline.module';

@Module({
  imports: [AirlineModule],
  controllers: [AirplaneController],
  providers: [AirplaneService],
})
export class AirplaneModule {}
