export function getResponse(
  status = 200,
  data: any = null,
  messageCode: any = null,
  message: string = null,
  success: boolean = true
) {
  const result: any = {
    status,
    data,
    success,
    messageCode: messageCode ? messageCode.toString() : "200",
    message,
  };

  if (status >= 400) {
    result.success = false;
  }
  return result;
}

export function getErrorResponse(
  status = 500,
  messageCode: any = null,
  message: any = null,
  error: any = null
) {
  const result: any = {
    status,
    message,
    messageCode: messageCode ? messageCode.toString() : "500",
    success: false,
    error,
  };

  return result;
}
