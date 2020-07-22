import { plainToClass } from 'class-transformer';
import {
  validate,
  ValidationError,
  ValidatorOptions,
} from 'class-validator';
import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import httpStatus from 'http-status';

import { getErrorResponse } from '../../src/config/response';
import {
  Message,
  MessageCodes,
} from '../shared/message-codes/message-codes';

const validationOptions: ValidatorOptions = {
  forbidUnknownValues: true,
  skipMissingProperties: false,
};

export function validateObjectMiddleware(typeValidatorClass): RequestHandler {
  return (request: Request, response: Response, next: NextFunction) => {
    validate(
      plainToClass(typeValidatorClass, request.body),
      validationOptions
    ).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => Object.values(error.constraints))
          .join(", ");
        const res = getErrorResponse(
          httpStatus.BAD_REQUEST,
          MessageCodes.Validation_Failed,
          Message.Validation_Failed
        );
        next(response.status(res.status).send(res));
      } else {
        next();
      }
    });
  };
}
