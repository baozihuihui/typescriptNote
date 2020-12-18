import fs from "fs";
import path from "path";
import { Router, Request, Response, NextFunction } from "express";
import getResponseData from "./util/response";
import Crowller from "./util/crowller";
import Analyzer from "./util/analyzer";

// 继承 解决 express 声明文件描述不准确的问题
interface BodyReauest extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : undefined;
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(false, "you need to login"));
  }
};

const router = Router();

router.get("/", (req: BodyReauest, res: Response) => {
  const isLogin = req.session ? req.session.login : undefined;
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
            <form method="post" action="/login" >
                <input type="password" name="password" />
                <button>提交</button>
            </form>
        </body>
      </html>
    `);
  }
});

router.get("/logout", (req: BodyReauest, res: Response) => {
  const { session } = req;
  if (session) {
    const isLogin = session.login;
    if (isLogin) {
      session.login = false;
      res.json(getResponseData(true));
    } else {
      res.json(getResponseData(false, "you are not login"));
    }
  } else {
    res.end("session error");
  }
});

router.post("/login", (req: BodyReauest, res: Response) => {
  const { session } = req;
  if (session) {
    const isLogin = session.login;
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
});

router.get("/getData", checkLogin, (req: BodyReauest, res: Response) => {
  const targetUrl = "http://localhost:8888";
  const localTagrgetUrl = targetUrl;
  const tSDemoAnalyzer = Analyzer.getInstace();
  new Crowller(localTagrgetUrl, tSDemoAnalyzer);
  res.json(getResponseData(true));
});

router.get("/showData", checkLogin, (req: BodyReauest, res: Response) => {
  try {
    const position = path.resolve(__dirname, "../data/courseInfo.json");
    let result = "{}";
    if (fs.existsSync(position)) {
      result = fs.readFileSync(position, "utf-8");
    }
    res.json(getResponseData(JSON.parse(result)));
  } catch (e) {
    console.log(e);
    res.json(getResponseData(false, "数据不存在"));
  }
});

export default router;
