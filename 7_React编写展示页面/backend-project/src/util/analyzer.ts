import cheerio from "cheerio";
import fs from "fs";
import { Analyzer } from "./crowller";

interface Course {
  title: string;
  counter: number;
}

interface CourseInfo {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}

export default class TSDemoAnalyzer implements Analyzer {
  private static tsDemoAnalyzer: TSDemoAnalyzer;

  static getInstace = () => {
    if (!TSDemoAnalyzer.tsDemoAnalyzer) {
      TSDemoAnalyzer.tsDemoAnalyzer = new TSDemoAnalyzer();
    }
    return TSDemoAnalyzer.tsDemoAnalyzer;
  };

  /**
   * 根据html提取需要的信息
   * @param {string} html
   */
  private getCourseInfo(html: string): CourseInfo {
    const $ = cheerio.load(html);
    const courseItems = $(".course-item");
    const courseInfo: Course[] = [];
    courseItems.map((index, element) => {
      const title = $(element).find(".course-item-title").text();
      const counter = parseInt($(element).find(".course-item-counter").text());
      courseInfo.push({ title, counter });
    });

    return {
      time: new Date().getTime(),
      data: courseInfo,
    };
  }

  /**
   * 从json文件中读取并合并新数据
   * @param {CourseInfo} courseInfo
   */

  private generateJSONContent(filePath: string, courseInfo: CourseInfo) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      const fileString = fs.readFileSync(filePath, "utf-8");
      fileContent = JSON.parse(fileString ? fileString : "{}");
    } else {
      console.log(`未找到文件：${filePath},现进行创建，后写入数据。`);
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  analyzer(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJSONContent(filePath, courseInfo);
    return JSON.stringify(fileContent);
  }

  private constructor() {}
}
