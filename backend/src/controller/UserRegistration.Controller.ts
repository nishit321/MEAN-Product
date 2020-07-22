import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { generatePassword } from "../../src/config/config";
import { getErrorResponse, getResponse } from "../../src/config/response";
import { IUserRegistration } from "../interface/UserRegistration.interface";
import UserRegistrationModel from "../model/UserRegistration.Model";
import { UserRegistrationRepository } from "../repositories/UserRegistrationRepository";
import { Message, MessageCodes } from "../shared/message-codes/message-codes";

export default class UserRegistrationController {
  /* create user registration by it interface type */
  public createUserRegistration = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const item = { emailAddress: request.body.emailAddress };
      const userRepository = new UserRegistrationRepository(
        UserRegistrationModel
      );
      const existingUser: IUserRegistration = await userRepository.findOne(
        JSON.stringify(item)
      );

      if (!existingUser) {
        const userRegistrationData: IUserRegistration = request.body;
        userRegistrationData.salt = crypto
          .randomBytes(Math.ceil(12))
          .toString("hex")
          .slice(0, 32);
        userRegistrationData.password = await generatePassword(
          userRegistrationData.password,
          userRegistrationData.salt
        );
        const userRepository = new UserRegistrationRepository(
          UserRegistrationModel
        );
        const newUserResponse = await userRepository.create(
          userRegistrationData
        );
        if (newUserResponse) {
          const res = getResponse(
            httpStatus.OK,
            newUserResponse,
            MessageCodes.Registration_Success,
            Message.Registration_Success
          );
          return response.status(res.status).send(res);
        } else {
          const res = getErrorResponse(
            httpStatus.INTERNAL_SERVER_ERROR,
            MessageCodes.UnexpectedError,
            Message.UnexpectedError
          );
          return response.status(res.status).send(res);
        }
      } else {
        const res = getErrorResponse(
          httpStatus.INTERNAL_SERVER_ERROR,
          MessageCodes.EmailAlreadyExists,
          Message.EmailAlreadyExists
        );
        return response.status(res.status).send(res);
      }
    } catch (error) {
      const res = getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        MessageCodes.UnexpectedError,
        Message.UnexpectedError,
        error
      );
      return response.status(res.status).send(res);
    }
  };
}
