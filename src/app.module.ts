import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CreateUserMiddleware } from './middleware/user_middleware/user_create.middleware';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AirplaneModule } from './airplane/airplane.module';
import { AirlineModule } from './airline/airline.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    AirplaneModule,
    AirlineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CreateUserMiddleware).forRoutes({
      method: RequestMethod.POST,
      path: '/user',
    });
  }
}
