/*
 * @Author: jweboy
 * @Date: 2019-11-01 13:15:49
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-23 13:46:30
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const WatchMissingNodeModules = require('./plugins/watch_missing_node_modules')
const baseWebpackConfig = require('./webpack.base.config');
const DynamicScript = require('./plugins/dynamic-script');
// const OpenBrowser = require('./plugins/open-browser');
const webpackDevServer = require('./webpackDevServer.config');
const manifest = require('../dist/dll/vendor-manifest.json');
const { dynamicScripts } = require('./config');
const paths = require('./paths');
const getEnvKeys = require('./tools/env_files');

const PUBLIC_PATH = '/';

// @ts-ignore
module.exports = merge(baseWebpackConfig, {
  // 编译模式
  mode: process.env.NODE_ENV,
  // 开发环境这个模式更快
  devtool: 'cheap-module-source-map',
  // 输出目录
  output: {
    // 在bundle中引入所包含模块信息的相关注释
    pathinfo: true,
    // 文件保存在 WebpackDevServer 的虚拟内存中
    filename: 'static/js/bundle.js',
    // 文件代码拆分
    chunkFilename: 'static/js/[name].chunk.js',
    // 静态资源目录,一般指向 '/'
    publicPath: PUBLIC_PATH,
  },
  devServer: webpackDevServer({ publicPath: PUBLIC_PATH }),
  plugins: [
    new webpack.DefinePlugin(getEnvKeys()),
    //   new WatchMissingNodeModules(),
    // 热加载模块
    new webpack.HotModuleReplacementPlugin(),
    // 热加载显示模块的相对路径
    new webpack.NamedModulesPlugin(),
    // index.html插件
    new HtmlWebpackPlugin({
      title: '监控系统',
      template: paths.appIndexHtml,
    }),
    // 打包时在动态链接库查找导入的模块
    // 如果存在直接从动态库中获取，无需重复打包
    new webpack.DllReferencePlugin({
      // @ts-ignore
      manifest,
    }),
    // 动态写入脚本集合
    new DynamicScript({
      // @ts-ignore
      assets: dynamicScripts,
    }),
    // new OpenBrowser({})
    // webpack运行详细记录面板
    // new DashboardPlugin(dashboard.setData)
  ],
  // 开发环境关闭性能提示
  performance: {
    hints: false,
  },
});
