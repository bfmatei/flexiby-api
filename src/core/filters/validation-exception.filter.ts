import { ArgumentsHost, Catch, ExceptionFilter, ValidationError } from '@nestjs/common';
import { Response } from 'express';

import { ValidationException } from '~core/exceptions/validation-exception';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const fields = exception.errors.map((error: ValidationError) => ({
      field: error.property,
      constraints: Object.keys(error.constraints)
    }));

    response.status(exception.getStatus()).json({
      code: 400,
      fields
    });
  }
}
