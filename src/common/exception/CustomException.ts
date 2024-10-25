import { HttpException, HttpStatus } from '@nestjs/common';
import { createErrorResponse } from '../responses';

export class CustomException extends HttpException {
  constructor(
    explanation: string,
    statusCode: number = HttpStatus.BAD_REQUEST,
  ) {
    const response = createErrorResponse(explanation || 'Some Error Occured');

    super(response, statusCode);
  }
}
