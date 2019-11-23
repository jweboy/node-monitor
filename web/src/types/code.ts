/*
 * @Author: jweboy
 * @Date: 2019-11-09 21:17:13
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-09 22:12:37
 */
export interface CodeDto {
  id: string;
  message: string;
  create_time: string;
  source: string;
  url: string;
  lineNo: number;
  columnNo: number;
  sourceContent: string;
}

export interface CodeParams {
  id: string;
}
