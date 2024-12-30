import { ApiProperty } from '@nestjs/swagger';

export type ErrorCode = 500 | 400 | 404;

export class ApiError {
  @ApiProperty({ type: 'boolean' })
  __apiError = true;

  @ApiProperty({
    enum: [500, 400, 404],
  })
  code: ErrorCode;

  @ApiProperty({ type: 'string' })
  message: string;

  @ApiProperty({ type: 'string', required: false })
  stack?: string;

  constructor(code: ErrorCode, message: string, stack?: string) {
    this.code = code;
    this.message = message;
    this.stack = stack;
  }
}
