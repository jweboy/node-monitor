const ora = require('ora')
const fsExtra = require('fs-extra')

const paths = require('./paths')
const config = require('./webpack.base.config')
const { copyFile } = require('./tools')

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 9000

// const spinner = ora('Starting development server...\n')
// spinner.start()

// 写成方法确保之后可能会动态化
module.exports = ({ publicPath }) => ({ 
    // 提供给 WebpackDevServer 的来源目录
    contentBase: paths.appDist,
    // 去除没用的 WebpackDevServer logs
    clientLogLevel: 'none',
    // 隐藏bundle相关信息,只接收错误和警告
    // noInfo: true, 
    // 全屏显示error错误信息
    overlay: true,
    // 开发过程中隐藏bundle信息，此选项覆盖noInfo和quiet选项
    // 有正常的log监听以及发生错误的时候输出错误
    stats: "errors-only",
    // FIXME: 精准显示bundle相关信息,用于调试环境。
    // stats: {
    //   assets: true,
    //   hash: true,
    // },
    // 启用gzip压缩
    compress: true,
    // 监听 paths.appDist 中的文件变化
    watchContentBase: true,
    // 热加载模块
    hot: true,
    // 静态资源的文件目录
    publicPath,
    // publicPath: config.output.publicPath,
    // 是否使用https协议
    https: protocol === 'https',
    // 主机名
    host,
    // 端口
    port,
    // 404响应代替为 index.html
    historyApiFallback: true,
    // before() {
		// },
		// after () {
		// 	spinner.succeed(`Server is listening on ${protocol}://${host}:${port}.`);
		// }
})