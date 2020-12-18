import "reflect-metadata";
import { Response } from "express";
import { controller, RequestConfig } from "../decorator";
import { BodyReauest } from "../common/interface";
import { Methods } from "../common/constant";
import getResponseData from "../common/function";

@controller("/api")
class LoginController {
  @RequestConfig(Methods.GET, "/isLogin")
  isLogin(req: BodyReauest, res: Response): void {
    const isLogin = !!(req.session ? req.session.login : undefined);
    const errMsg = isLogin ? undefined : "未登陆";
    res.json(getResponseData(isLogin, errMsg));
  }

  @RequestConfig(Methods.GET, "/logout")
  logout(req: BodyReauest, res: Response): void {
    const { session } = req;
    if (session) {
      const isLogin = !!session.login;
      if (isLogin) {
        session.login = false;
        res.json(getResponseData(true));
      } else {
        res.json(getResponseData(false, "you are not login"));
      }
    } else {
      res.end("session error");
    }
  }

  @RequestConfig(Methods.POST, "/login")
  login(req: BodyReauest, res: Response): void {
    const { session } = req;
    if (session) {
      const isLogin = !!session.login;
      if (isLogin) {
        res.json(getResponseData(false, "you had logined !"));
      } else {
        if (req.body.password === "123") {
          session.login = true;
          res.json(getResponseData(true));
        } else {
          res.json(getResponseData(false, "password error !"));
        }
      }
    } else {
      res.end("session error");
    }
  }
}

export default LoginController;
