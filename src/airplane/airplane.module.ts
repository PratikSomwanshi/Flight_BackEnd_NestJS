import { Module } from '@nestjs/common';
import { AirplaneService } from './airplane.service';
import { AirplaneController } from './airplane.controller';

@Module({
  controllers: [AirplaneController],
  providers: [AirplaneService],
})
export class AirplaneModule {}
