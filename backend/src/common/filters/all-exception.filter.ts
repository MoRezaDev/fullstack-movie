import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const exceptionResponse: any = exception.getResponse?.();
    const message =
      typeof exceptionResponse.message === 'object'
        ? exceptionResponse.message[0]
        : exception.message;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
    });
  }
}
