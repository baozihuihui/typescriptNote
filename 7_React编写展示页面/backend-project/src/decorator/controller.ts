import { RequestHandler } from "express";
import { Methods } from "../common/constant";
import router from "../router";

/**
 * 根据是否有元数据 自动生成 路由
 * @param root 路由跟路径  root = ‘/’ ? path:root + path
 */
export function controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      // 取出映射数据
      const path: string = Reflect.getMetadata("path", target.prototype, key);
      // 从原型链上取出key对应的函数
      const handler = target.prototype[key];
      const Methods: Methods = Reflect.getMetadata(
        "methods",
        target.prototype,
        key
      );
      const middlewares: RequestHandler = Reflect.getMetadata(
        "middlewares",
        target.prototype,
        key
      );
      if (path) {
        const fullPath = root === "/" ? path : `${root}${path}`;
        if (middlewares && middlewares.length) {
          router[Methods](fullPath, middlewares, handler);
        } else {
          router[Methods](fullPath, handler);
        }
      }
    }
  };
}
