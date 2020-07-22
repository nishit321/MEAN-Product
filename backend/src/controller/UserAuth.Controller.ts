import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";

import config, { generatePassword } from "../../src/config/config";
import { getErrorResponse, getResponse } from "../../src/config/response";
import { IUserRegistration } from "../interface/UserRegistration.interface";
import UserRegistrationModel from "../model/UserRegistration.Model";
import { UserRegistrationRepository } from "../repositories/UserRegistrationRepository";
import { Message, MessageCodes } from "../shared/message-codes/message-codes";

export default class UserAuthController {
  public login = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { emailAddress, password } = request.body;

      const userRepository = new UserRegistrationRepository(
        UserRegistrationModel
      );
      let user: IUserRegistration;
      const item = { emailAddress: emailAddress };
      user = await userRepository.findOne(JSON.stringify(item));
      //Check if encrypted password match
      if (
        user.password.match(await generatePassword(password, user.salt)) ===
        null
      ) {
        const res = getErrorResponse(
          httpStatus.INTERNAL_SERVER_ERROR,
          MessageCodes.UnAuthorized,
          Message.UnAuthorized
        );
        return response.status(res.status).send(res);
      }
      //Sing JWT, valid for 1 hour
      const token = jwt.sign(
        { userId: user.id, emailAddress: user.emailAddress },
        config.jwtSecret,
        { expiresIn: config.jwtExpiration }
      );

      const res = getResponse(
        httpStatus.OK,
        { token, user },
        MessageCodes.Login_Success,
        Message.Login_Success
      );
      return response.status(res.status).send(res);
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
