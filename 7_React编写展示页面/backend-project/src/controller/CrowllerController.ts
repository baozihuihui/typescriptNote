import "reflect-metadata";
import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { controller, RequestConfig, use } from "../decorator";
import Crowller from "../util/crowller";
import Analyzer from "../util/analyzer";
import { BodyReauest } from "../common/interface";
import { Methods, targeCrowllertUrl } from "../common/constant";
import getResponseData from "../common/function";
import checkLogin from "../customMiddleware/checkLogin";
import test from "../customMiddleware/test";

@controller("/api")
class CrowllerController {
  @RequestConfig(Methods.GET, "/getData")
  @use([checkLogin, test])
  @use([checkLogin, test])
  getData(req: BodyReauest, res: Response): void {
    const tSDemoAnalyzer = Analyzer.getInstace();
    new Crowller(targeCrowllertUrl, tSDemoAnalyzer);
    res.json(getResponseData(true));
  }

  @RequestConfig(Methods.GET, "/showData")
  // @use([checkLogin, test])
  showData(req: BodyReauest, res: Response): void {
    try {
      // 文件位置有个 bug 永远是按照编译后文件的相对路径进行读取，那么一旦文件位置发生改变就没办法正确的 reslove
      const position = path.resolve(__dirname, "../../data/courseInfo.json");
      const result = fs.readFileSync(position, "utf-8");
      res.json(getResponseData(JSON.parse(result)));
    } catch (e) {
      console.log(e);
      res.json(getResponseData(false, "数据不存在"));
    }
  }
}

export default CrowllerController;
