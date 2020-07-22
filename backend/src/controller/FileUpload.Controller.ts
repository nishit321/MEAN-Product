import {
  NextFunction,
  Response,
} from 'express';
import httpStatus from 'http-status';

import {
  getErrorResponse,
  getResponse,
} from '../config/response';
import {
  Message,
  MessageCodes,
} from '../shared/message-codes/message-codes';

const envs = require("../../.env/envs");
const uuid4 = require("uuid4");
const mime = require("mime-types");
const AWS = require("aws-sdk");

export default class FileUploadController {
  public fileUpload = async (
    request: any,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const s3 = new AWS.S3({
        accessKeyId: envs.aws.AWS_ACCESS_KEY,
        secretAccessKey: envs.aws.AWS_SCERET,
      });

      // Setting up S3 upload parameters
      const params = {
        Bucket: envs.aws.BUCKET_NAME,
        Key: uuid4() + "." + mime.extension(request.file.mimetype), // File name you want to save as in S3
        Body: request.file.buffer,
      };
      // Uploading files to the bucket
      s3.upload(params, function (err, data) {
        if (err) {
          const res = getErrorResponse(
            httpStatus.INTERNAL_SERVER_ERROR,
            MessageCodes.UnexpectedError,
            Message.UnexpectedError
          );
          return response.status(res.status).send(res);
        }
        const res = getResponse(
          httpStatus.OK,
          {
            DownloadURL: data.Location,
            FileName: data.Location,
          },
          MessageCodes.FileUpload_Success,
          Message.FileUpload_Success
        );
        return response.status(res.status).send(res);
      });
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
