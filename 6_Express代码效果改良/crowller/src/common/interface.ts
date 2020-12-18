import { Request } from "express";
// 继承 解决 express 声明文件描述不准确的问题
export interface BodyReauest extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

export interface ResponseData<T> {
  result: boolean;
  errMsg: string;
  data: T;
}
