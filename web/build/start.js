// process.env.NODE_ENV = 'development'

// const webpack = require('webpack')
// const browserSync = require('browser-sync')
// const webpackConfig = require('./webpack.dev.config');

// const compiler = webpack(webpackConfig)
// const port = process.env.PORT || 9000
// const host = process.env.HOST || '127.0.0.1'

// // https://github.com/webpack/webpack-dev-middleware
// const devMiddleware = require('webpack-dev-middleware')(compiler, {
//   publicPath: webpackConfig.output.publicPath,
//   stats: {
//     colors: true, // bundle信息展示
//     assets: true, // 增加资源信息
//     version: true, // 增加 webpack 版本信息
//     hash: true,  // 增加编译的哈希值
//     timings: true, // 增加时间信息
//     children: true, // 增加子级的信息
//     errors: true, // 增加错误信息
//     errorDetail: true, // 增加错误的详细信息（类似解析日志）
//     modules: false, // 增加内置的模块信息
//     chunks: false, // 增加包信息（设置为 `false` 能允许较少的冗长输出）
//     chunkModules: false,  // 将内置模块信息增加到包信息
//   },
//   inline: true, // 内联模式,处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台处理实时重载的脚本被插入到你的包(bundle)中，
//   // 并且构建消息将会出现在浏览器控制台
//   quiet: false, // 初始启动信息之外的任何内容都不会被打印到控制台, 来自 webpack 的错误或警告在控制台不可见
//   noInfo: false, // 启动时和每次保存之后，webpack 包(bundle)信息的消息将被隐藏,错误和警告仍然会显示
//   overlay: true, // 浏览器全屏显示错误或警告信息
//   progress: true, // 运行进度输出到控制台
// });

// // 开启服务，加载app中间件
// browserSync({
//   port,
//   ui: false,
//   logPrefix: process.env.NODE_ENV,
//   reloadOnRestart: true,
//   open: false,
//   server: {
//     baseDir: 'dist',
//     middleware: [
//       devMiddleware,
//       // hotMiddleware,
//       // proxyMiddleware
//       // app,
//     ],
//   },
//   file: [
//     '/index.html',
//   ],
// })

// devMiddleware.waitUntilValid(() => {
//   console.log(`> Listening at ${host}:${port}\n`);
// })