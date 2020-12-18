import { Request, Response, NextFunction } from "express";
import getResponseData from "../common/function";
/**
 * 检查是否登陆的中间件
 * @param req 请求
 * @param res  响应
 * @param next 通知 express 继续执行下一步
 */
export default (req: Request, res: Response, next: NextFunction) => {
  console.log("checkLogin middleware");
  const isLogin = !!(req.session ? req.session.login : undefined);
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(false, "you need to login"));
  }
};
