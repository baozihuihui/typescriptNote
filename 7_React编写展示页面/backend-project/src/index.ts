import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
// 引入 路由控制器 自动执行装饰器
import "./controller/LoginController";
import "./controller/CrowllerController";
import router from "./router";

/**
 * 问题1: express 的类型定义文件不准确，.d.ts 提供的类型无法进行错误提示
 * 问题2: 使用中间件后，中间件对于参数的变更，没有对应类型文件进行描述
 */
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: "session",
    keys: ["FattyCat"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(router);

app.listen(7001, () => {
  console.log("server is running...\n");
  console.log("Please see http://localhost:7001");
});
