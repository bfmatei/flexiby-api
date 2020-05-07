import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

export class ValidationException extends HttpException {
  errors: ValidationError[] = [];

  constructor(errors: ValidationError[] = []) {
    super('ValidationException', HttpStatus.BAD_REQUEST);

    this.errors = errors;
  }
}
