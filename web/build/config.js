/*
 * @Author: jweboy
 * @Date: 2019-11-01 13:26:18
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-01 13:26:39
 */
module.exports = {
	apiUrl : JSON.stringify('https://staging-api.creams.io/web/'),
	experienceUrl: JSON.stringify('https://demo-beta.creams.io'),
	vendor: [
		'react',
		'react-dom',
		// 'react-router-dom',
		// 'redux-saga',
		// 'antd',
	],
	dynamicScripts: [
		'/dll/dll_vendor.js'
	]
};
