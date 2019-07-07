process.env.NODE_ENV = 'development';

const webpack = require('webpack')
const path = require('path')
const paths = require('./paths')
const { vendor } = require('../config')

/**
 * 将项目依赖的基础模块（第三方模块）抽离出来, 打包到一个单独的动态链接库
 */

module.exports = {
  mode: process.env.NODE_ENV,
  entry: { vendor },
  output: {
    // 输出dll所在目录
    path: path.join(__dirname, '../dist/dll'),
    // 生成dll的文件名,这里就是 dll_vendor.js
    filename: 'dll_[name].js',
    // 模块全局变量名,这个字段必须跟 webpack.DllPlugin 的name字段一致
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dist/dll', '[name]-manifest.json'),
      name: '[name]_[hash]'
    })
  ]
}