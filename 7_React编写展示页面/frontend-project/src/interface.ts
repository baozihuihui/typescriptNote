export interface IResponse<T> {
  data: T;
  errMsg: string;
  result: boolean;
}
