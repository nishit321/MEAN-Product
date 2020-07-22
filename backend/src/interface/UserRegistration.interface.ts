import { Document } from 'mongoose';

export interface IUserRegistration extends Document {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  salt: string;
}
