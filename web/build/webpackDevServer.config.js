/*
 * @Author: jweboy
 * @Date: 2019-11-01 13:15:49
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-17 11:13:29
 */


// const ora = require('ora');
// const config = require('./webpack.base.config');
const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 9000;

// 写成方法确保之后可能会动态化
module.exports = ({ publicPath }) => ({
  contentBase: paths.appDist, // 提供给 WebpackDevServer 的来源目录
  clientLogLevel: 'none', // 去除没用的 WebpackDevServer logs
  // 隐藏bundle相关信息,只接收错误和警告
  // noInfo: true,
  // 全屏显示error错误信息
  overlay: true,
  // 开发过程中隐藏bundle信息，此选项覆盖noInfo和quiet选项
  // 有正常的log监听以及发生错误的时候输出错误
  stats: 'errors-only',
  // stats: { FIXME: 精准显示bundle相关信息,用于调试环境。
  //   assets: true,
  //   hash: true,
  // },
  compress: true, // 启用gzip压缩
  watchContentBase: true, // 监听 paths.appDist 中的文件变化
  hot: true, // 热加载模块
  publicPath, // 静态资源的文件目录
  https: protocol === 'https', // 是否使用https协议
  host, // 主机名
  port, // 端口
  historyApiFallback: true, // 404响应代替为 index.html
  proxy: { // 接口转发代理
    '/api': {
      target: process.env.API_URL,
    },
  },
});
