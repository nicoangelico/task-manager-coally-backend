import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiError } from './api-error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    this.logger.error(`Unexpected error: ${JSON.stringify(exception)}`);

    if (exception instanceof BadRequestException) {
      const exResponse: any = exception.getResponse();
      const statusCode = HttpStatus.BAD_REQUEST;

      const message = Array.isArray(exResponse.message)
        ? exResponse.message.join('. ')
        : exResponse.message;
      const apiError = new ApiError(statusCode, message);
      return httpAdapter.reply(ctx.getResponse(), apiError, statusCode);
    }

    if (exception instanceof NotFoundException) {
      const exResponse: any = exception.getResponse();
      const statusCode = HttpStatus.NOT_FOUND;

      const message = Array.isArray(exResponse.message)
        ? exResponse.message.join('. ')
        : exResponse.message;
      const apiError = new ApiError(statusCode, message);
      return httpAdapter.reply(ctx.getResponse(), apiError, statusCode);
    }

    if (exception instanceof Error) {
      const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      const apiError = new ApiError(statusCode, exception.message);
      return httpAdapter.reply(ctx.getResponse(), apiError, statusCode);
    }
  }
}
