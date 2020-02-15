import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    super(errors, HttpStatus.BAD_REQUEST);
  }
}
