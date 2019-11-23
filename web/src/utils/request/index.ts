/*
 * @Author: jweboy
 * @Date: 2019-11-01 23:21:05
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-22 23:20:52
 */
import * as axios from 'axios';
import { notification } from 'antd';
import config from './config';

// 参考文章 https://juejin.im/post/59a22e71518825242c422604

const request = axios.default.create(config);

// 请求拦截器
request.interceptors.request.use(
  function reqHandler(config: axios.AxiosRequestConfig) {
    return config;
  },
  function respHandler(err: Error) {
    return Promise.reject(err);
  },
);


// 响应拦截器
request.interceptors.response.use(
  function reqHandler(res: axios.AxiosResponse) {
    if (res.data) {
      // 常规请求
      if (res.status === 200) {
        return res.data;
      }

      // 请求服务器直接下载文件
      if (res.config.responseType === 'blob') {
        // handler
      }
    } else {
      const { message } = res.data;

      notification.error({ message: '请求失败', description: message });

      return Promise.reject(message);
    }
  },
  function respHander(err: Error) {
    notification.error({ message: '请求错误', description: err.message });

    return Promise.reject(err);
  }
);

export default request;
