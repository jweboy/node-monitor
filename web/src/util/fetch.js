// const env = require('./env')

/* eslint-disable */
const fetchTimeOut = (fetchPromise, timeout = 10000) => {
	let timeoutFunc = null;

	// 这是一个可以被reject的Promise
	const timeoutPormise = new Promise((resolve, reject) => {
		timeoutFunc = () => {
			reject('timeout promise');
		};
	});

	// 使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
	const abortablePromise = Promise.race([
		fetchPromise,
		timeoutPormise,
	]);

	setTimeout(() => {
		timeoutFunc();
	}, timeout);

	return abortablePromise;
};

// let APIURL = ''
// let APIURL = 'https://easy-mock.com/mock/591534589aba4141cf221a76/react/biolerplate'
// if (!env.__esModule) {
// console.warn(env.__esModule)
// APIURL = 'https://easy-mock.com/mock/591534589aba4141cf221a76/react/biolerplate'
// }

const fetchRequest = (api, method = 'GET', params) => {
	const headers = {
		'Content-Type': 'application/json;charset=UTF-8',
	};
	console.log(`request api: ${api}, ${params}`); // 打印请求参数

	const requestBody = {
		method,
		headers,
	};

	if (params && method === 'POST') {
		requestBody.body = JSON.stringify(params);
	}

	return new Promise((resolve, reject) => {
		fetchTimeOut(fetch(`${api}`, requestBody))
			.then(response => response.json())
			.then((res) => {
				console.log('res:', api, res); // 请求成功返回数据
				resolve(res);
			})
			.catch((error) => {
				console.error('error', api, error); // 请求失败返回数据
				reject(error);
			});
	});
};

export default fetchRequest;
