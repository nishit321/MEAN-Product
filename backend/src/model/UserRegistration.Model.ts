import {
  model,
  Schema,
} from 'mongoose';

import { IUserRegistration } from '../interface/UserRegistration.interface';

const UserRegistrationSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
  },
  { timestamps: true }
);

const UserRegistrationModel = model<IUserRegistration>(
  "users",
  UserRegistrationSchema
);
export default UserRegistrationModel;
