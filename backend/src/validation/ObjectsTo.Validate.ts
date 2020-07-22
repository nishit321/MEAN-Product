import { IsString } from 'class-validator';

// TODO: this is just an example of how we define validation classes!
export class UserRegistrationValidator {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public emailAddress: string;

  @IsString()
  public password: string;
}

export class UserLoginValidator {
  @IsString()
  public emailAddress: string;

  @IsString()
  public password: string;
}
