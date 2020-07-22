import {
  NextFunction,
  Request,
  Response,
} from 'express';
import httpStatus from 'http-status';

import { getErrorResponse } from '../../src/config/response';
import {
  Message,
  MessageCodes,
} from '../shared/message-codes/message-codes';

export default class DasboardController {
  public dashboard = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      // const token = <string>request.headers["auth"];
      // request["user"]
      return response.send({ status: true, resqyes: request["user"] });
    } catch (error) {
      const res = getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        MessageCodes.UnexpectedError,
        Message.UnexpectedError
      );
      return response.status(res.status).send(res);
    }
  };
}
