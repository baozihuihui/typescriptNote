import { Methods } from "../common/constant";

/**
 * save path  and RequestType
 * @param {Methods} type 请求类型
 * @param {string} path 路由
 */
export function RequestConfig(type: Methods, path: string) {
  return function (target: any, key: string) {
    Reflect.defineMetadata("path", path, target, key);
    Reflect.defineMetadata("methods", type, target, key);
  };
}
