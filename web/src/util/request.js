import axios from 'axios';
import qs from 'query-string';
import { notification } from 'antd';

// 参考文章 https://juejin.im/post/59a22e71518825242c422604

// TODO: 区别不同环境的 URL
// const BASEURL = 'http://localhost:4004/api';
const BASEURL = 'http://jweboy.com:4004/api';

// function getRequestKey(config) {
//   return config.url + '|' + config.method;
// }

// function removeMultipleRequest(config) {
//   const key = getRequestKey(config);
//   if(typeof pendingQueque[key] === 'function') {
//     delete pendingQueque[key];
//   }
// }

// 基础信息配置
const Axios = axios.create({
	baseURL: BASEURL,
	timeout: 5000, // 5s超时，
	responseType: 'json', // 返回json格式
	// FIXME: 暂时不能加缓存，后续需要更改
	withCredentials: false, // 是否允许携带cookie等
	headers: {
		'content-Type': 'application/x-www-form-urlencode;charset=utf-8'
	},
	// 自定义字段
	_loading: true,
	_useForm: false
});

// 请求拦截器
Axios.interceptors.request.use(
	function reqSuccHandler(config) {
		// FIXME: 有实时搜索的请求时候测试这块的重复请求取消
		// removeMultipleRequest(config);
		// config.cancelToken = new CancelToken((cancel) =>{
		//   const key = getRequestKey(config);
		//   pendingQueque[key] = cancel;
		// });
		// console.table(pendingQueque)

		if (config._useForm) {
			config.headers['content-Type'] = 'application/x-www-form-urlencoded';
			config.data = qs.stringify(config.data);
		}
		return config;
	},
	function reqErrHandler(err) {
		console.error('req_err', err);
		return Promise.reject(err);
	}
);

// 响应拦截器
Axios.interceptors.response.use(
	function resSuccHandler(res) {
		if (res.data) {
			// 常规请求
			if (res.status === 200) {
				return res.data;
			}

			// 请求服务器直接下载文件
			if (res.config.responseType === 'blob') {
				return res.data;
			}
		} else {
			// console.warn(res.data);
			// const msg = res.data ? res.data.message : '';

			// notification.error({ title: '请求失败', message: msg });

			// return Promise.reject(msg);
		}
	},
	function resErrHander(err) {
		console.error('res_err', err);
		// TODO: 这里可以用来做登录、特定状态的判断

		// 中途取消请求
		const isCanceled = axios.isCancel(err);
		const errMsg = isCanceled ? '当前请求被中断了' : err.message;
		console.warn(errMsg);

		// 返回错误信息
		notification.error({ title: '请求错误', message: errMsg });

		return Promise.reject(err);
	}
);

// 导出用于vuex
export const CancelToken = axios.CancelToken;
export const request =  Axios;
