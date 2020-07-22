export enum MessageCodes {
  Login_Success = 202,
  Registration_Success = 202,
  FileUpload_Success = 203,
  Product_Delete = 204,
  Product_Update = 204,
  Product_Create = 205,
  UnexpectedError = 500,
  EmailAlreadyExists = 501,
  Validation_Failed = 503,
  UnAuthorized = 504,
}

export enum Message {
  Login_Success = "Successfully Login",
  Registration_Success = "You are registered successfully. Verification link is sent to your registered email address.",
  UnexpectedError = "Something went wrong! Please try after some time",
  EmailAlreadyExists = "Email already exists!",
  Validation_Failed = "Please filled all mandatory fields",
  UnAuthorized = "Incorrect Email and Password",
  FileUpload_Success = "File uploaded successfully",
  Product_Delete = "Product deleted successfully",
  Product_Update = "Product updated successfully",
  Product_Create = "Product created successfully",
}
