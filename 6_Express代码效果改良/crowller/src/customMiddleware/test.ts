import { Request, Response, NextFunction } from "express";
import getResponseData from "../common/function";
/**
 * 多中间件 装饰器 测试
 * @param req 请求
 * @param res  响应
 * @param next 通知 express 继续执行下一步
 */
export default (req: Request, res: Response, next: NextFunction) => {
  console.log("test middleware");
};
