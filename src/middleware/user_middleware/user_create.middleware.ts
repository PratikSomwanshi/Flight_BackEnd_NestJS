import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomException } from 'src/common/exception/CustomException';

@Injectable()
export class CreateUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.body.user_email) {
      throw new CustomException('User email is required', HttpStatus.NOT_FOUND);
    } else if (!req.body.user_password) {
      throw new CustomException(
        'User password is required',
        HttpStatus.NOT_FOUND,
      );
    } else if (!req.body.user_name) {
      throw new CustomException('User name is required', HttpStatus.NOT_FOUND);
    } else {
      next();
    }
  }
}
