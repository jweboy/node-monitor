/*
 * @Author: jweboy
 * @Date: 2019-11-07 20:08:19
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-08 20:30:05
 */
// declare namespace Request {
//   export interface Response {
//     data: NetResponse;
//   }

//   export interface NetResponse {
//     data: any;
//     code: number;
//     message: string;
//   }
// }

export interface Response {
  data: NetResponse;
}

export interface NetResponse {
  data: any;
  code: number;
  message: string;
}
