interface ResponseData<T> {
  result: boolean;
  errMsg: string;
  data: T;
}

export default function getResponseData<T>(
  data: T,
  errMsg?: string
): ResponseData<T> {
  let defaultResult = {
    result: true,
    errMsg: "",
    data,
  };

  if (errMsg) {
    defaultResult.result = false;
    defaultResult.errMsg = errMsg;
  }
  return defaultResult;
}
