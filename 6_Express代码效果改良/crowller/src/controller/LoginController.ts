import "reflect-metadata";
import { Response } from "express";
import { controller, RequestConfig } from "../decorator";
import { BodyReauest } from "../common/interface";
import { Methods } from "../common/constant";
import getResponseData from "../common/function";

@controller("/")
class LoginController {
  @RequestConfig(Methods.GET, "/")
  home(req: BodyReauest, res: Response): void {
    const isLogin = !!(req.session ? req.session.login : undefined);
    if (isLogin) {
      res.end(`
            <!DOCTYPE html>
            <html>
              <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Document</title>
              </head>
              <body>
                 <a href="getData">爬取数据</a>
                 <a href="showData">展示数据</a>
                 <a href="logout">退出</a>
              </body>
            </html>
          `);
    } else {
      res.end(`
            <!DOCTYPE html>
            <html>
              <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Document</title>
              </head>
              <body>
                  <form Methods="post" action="/login" >
                      <input type="password" name="password" />
                      <button>提交</button>
                  </form>
              </body>
            </html>
          `);
    }
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
