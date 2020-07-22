import {
  NextFunction,
  Request,
  Response,
} from 'express';
import * as jwt from 'jsonwebtoken';

import config from '../config/config';

// TODO: remove this when authorization is implemented
const skipAuthorization = true;

export default function authorizationValidationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const token = <string>request.headers["authorization"];
  let jwtPayload;
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    response.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    response.status(401).send({ status: false, message: "Token is not valid" });
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, emailAddress } = jwtPayload;
  request["user"] = jwtPayload;
  const newToken = jwt.sign({ userId, emailAddress }, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });
  response.setHeader("token", newToken);

  next();
}
