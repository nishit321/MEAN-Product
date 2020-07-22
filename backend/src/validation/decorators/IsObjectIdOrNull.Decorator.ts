import {registerDecorator, ValidationOptions, Validator} from "class-validator";
import { Types } from "mongoose";

// own validation decorator to check if string is a valid mongodb ObjectId or null.
export function IsObjectIdOrNull(validationOptions?: ValidationOptions)  {
  return function ( object: Record<string, any>, propertyName: string ): void {
    registerDecorator({
      name: "IsObjectIdOrNull",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          const validator = new Validator();
          if ( validator.isString(value) && Types.ObjectId.isValid(value) ) {
            return true;
          } else {
            return validator.isEmpty(value);
          }
        }
      }
    });
  };
}
