import superagent from "superagent";
import fs from "fs";
import path from "path";
import TSDemoAnalyzer from "./tsdemoAnalyzer";

const targetUrl = "http://localhost:8888";
const localTagrgetUrl = targetUrl;

export interface Analyzer {
  analyzer: (html: string, filePath: string) => string;
}

class Crowller {
  private JSONPath = path.resolve(__dirname, "../data/courseInfo.json");

  /**
   * 获取 目标地址 html 文件
   */
  private async getRawHtml() {
    console.log(`crowller ${this.url}`);
    console.time("crowller");
    const result = await superagent.get(this.url);
    console.timeEnd("crowller");
    return result.text;
  }

  /**
   * 将合并后数据写入文件
   * @param content 待写入数据
   */
  private writeFile = (content: string) => {
    console.time("write");
    fs.writeFileSync(this.JSONPath, content);
    console.timeEnd("write");
  };

  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyzer(html, this.JSONPath);
    this.writeFile(fileContent);
  }

  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess();
  }
}

const tSDemoAnalyzer = TSDemoAnalyzer.getInstace();
new Crowller(localTagrgetUrl, tSDemoAnalyzer);
console.log("console.log for tsc -w");
