/*
 * @Author: jweboy
 * @Date: 2019-11-01 13:16:17
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-22 23:42:44
 */
const webpack = require('webpack');
const HappyPack = require('happypack');
const tsImportPlugin = require('ts-import-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const os = require('os');
const isDevEnv = process.env.NODE_ENV === 'development';
const paths = require('./paths');

// @ts-ignore
const happyThreadPool = HappyPack.ThreadPool({
  size: 4,
});
const happyThreads = 4;
const imagePath = 'static/imgs/';

// FIXME: ts-loader优化方案,参考文章 https://medium.com/webpack/typescript-webpack-super-pursuit-mode-83cc568dea79
// FIXME: 1.采用缓存和线程加载器 2.happyPack

module.exports = {
  target: 'web',
  context: paths.appPath,
  entry: [
    // 入口文件
    paths.appIndexJs,
  ],
  resolve: {
    // 自动解析文件后缀扩展名
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less'],
    // 全局声明目录,绝对路径引用
    alias: {
      components: paths.appSrcComponents,
      util: paths.appSrcUtil,
      'react-dom': '@hot-loader/react-dom',
    },
    // 解析模块应该搜索的目录
    modules: [
      paths.appSrc,
      paths.apppNodeModules,
    ],
  },
  module: {
    rules: [
      // 解析src项目里的less文件
      {
        test: /\.(css|less)$/,
        include: paths.appSrc,
        exclude: paths.apppNodeModules,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'typings-for-css-modules-loader', // 替代 css-loader
            options: {
              modules: true,
              namedExport: true,
              camelCase: true,
              sourceMap: true,
              localIdentName: '[local]--[hash:base64:6]',
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              sourceMap: true,
            },
          },
        ],
      },
      // 解析 node_modules 目录中的 less 文件
      {
        test: /\.(css|less)/,
        include: paths.apppNodeModules,
        exclude: paths.appSrc,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              sourceMap: true,
            },
          },
        ],
      },
      // es6+语法、react语法解析loader
      {
        test: [/\.js(x)?$/, /\.mjs$/],
        exclude: /node_modules/,
        include: paths.appSrc,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // 将转译结果缓存到文件系统, 文档说 babel-loader 提速至少两倍
              // 默认缓存目录 ./node_modules/.cache/babel-loader/
              cacheDirectory: true,
            },
          },
        ],
        // loader: 'happypack/loader?id=happyBabel',
      },
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        include: paths.appSrc,
        // loader: 'happypack/loader?id=typescript',
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              getCustomTransformers: () => ({ // `antd` 样式按需加载
                before: [tsImportPlugin({
                  libraryName: 'antd',
                  style: true,
                }) ],
              }),
            },
          },
        ],
      },
      {
        test: /\.(png|jp(e)?g|gif)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader',
          options: {
            name() {
              return isDevEnv ? '[name].[ext]' : '[name]__[hash:6].[ext]';
            },
            limit: 10240, // 限制图片大小为10M以内
            // emitFile: false, // 不打包输出图片目录,一般用于图片全部托管于图床
            outputPath: imagePath, // 图片输出路径,开发环境保存在虚拟内存中,即对应 dist/statis/imgs/目录
          },
        }],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'url-loader',
      },
    ],
  },
  plugins: [
    // 模块路径匹配磁盘实际地址
    new CaseSensitivePathsPlugin(),
    // new HappyPack({
    //   id: 'happyBabel',
    //   // 源码编译生成的 Node虚拟模块的数量, 4个是最佳方案。
    //   threads: happyThreads,
    //   // 线程池大小
    //   threadPool: happyThreadPool,
    //   loaders: [{
    //     loader: 'babel-loader',
    //     options: {
    //       // 将转译结果缓存到文件系统, 文档说 babel-loader 提速至少两倍
    //       // 默认缓存目录 ./node_modules/.cache/babel-loader/
    //       cacheDirectory: true,
    //     },
    //   }],
    // }),
    // happyPack会隐式设置属性transpileOnly为true,并关闭所有错误和警告信息
    // 可以使用fork-ts-checker-webpack-plugin进行类型检查
    // new HappyPack({
    //   id: 'typescript',
    //   threads: 2,
    //   loaders: [{
    //     // loader: 'ts-loader'
    //     loader: 'awesome-typescript-loader',
    //     options: {
    //       getCustomTransformers: () => ({ // `antd` 样式按需加载
    //         before: [tsImportPlugin({
    //           libraryName: 'antd',
    //           style: true,
    //         }) ],
    //       }),
    //     },
    //   }],
    // }),
    // 单独进程运行类型检查器（增量检查类型、AST缓存）
    new ForkTsCheckerWebpackPlugin({
      // 确保插件检查语法、语义错误
      checkSyntacticErrors: true,
    }),
  ],
};
