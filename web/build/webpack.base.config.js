const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const webpack = require('webpack')
const HappyPack = require('happypack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const os = require('os')

const paths = require('./paths')
const { apiUrl, experienceUrl } = require('../config')

const happyThreadPool = HappyPack.ThreadPool({
	size: 4
})
const happyThreads = 4
const imagePath = 'static/imgs/'

// FIXME: ts-loader优化方案,参考文章 https://medium.com/webpack/typescript-webpack-super-pursuit-mode-83cc568dea79
// FIXME: 1.采用缓存和线程加载器 2.happyPack

module.exports = {
	target: 'web',
	context: paths.appPath,
	entry: [
		// Promise、Fetch polyfill
		require.resolve('./polyfills'),
		// 入口文件
		paths.appIndexJs,
	],
	resolve: {
		// 自动解析文件后缀扩展名
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.mjs'],
		// 全局声明目录,绝对路径引用
		alias: {
			components: paths.appSrcComponents,
			util: paths.appSrcUtil
		},
		// 解析模块应该搜索的目录
		modules: [
			paths.appSrc,
			paths.apppNodeModules
		]
	},
	module: {
		rules: [
			// es6+语法、react语法解析loader
			{
				test: [/\.js(x)?$/, /\.mjs$/],
				exclude: /node_modules/,
				include: paths.appSrc,
				loader: 'happypack/loader?id=happyBabel',
			},
			{
				test: /\.ts(x)?$/,
				exclude: /node_modules/,
				include: paths.appSrc,
				use: [{
					// 缓存加载器
					loader: 'cache-loader'
				}, {
					// 线程加载器
					loader: 'thread-loader',
					options: {
						// 分配一个cpu给ForkTsCheckerWebpackPlugin插件
						workers: os.cpus().length - 1
					}
				}, {
					loader: 'ts-loader',
					options: {
						// 使用happyPackMode模式加速编译并减少报告给webpack的错误
						happyPackMode: true
					}
				}]
				// loader: 'happypack/loader?id=happyTypeScript'
			},
			{
				test: /\.(png|jp(e)?g|gif)$/,
				exclude: /node_modules/,
				use: [{
						loader: 'file-loader',
						options: {
							name(file) {
								if (process.env.NODE_ENV === 'development') {
									return '[name].[ext]'
								}
								return '[name]__[hash:6].[ext]'
							},
							limit: 10240, // 限制图片大小为10M以内
							// emitFile: false, // 不打包输出图片目录,一般用于图片全部托管于图床
							outputPath: imagePath // 图片输出路径,开发环境保存在虚拟内存中,即对应 dist/statis/imgs/目录
						}
				}]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: 'url-loader'
			}
		]
	},
	plugins: [
		// 模块路径匹配磁盘实际地址
		new CaseSensitivePathsPlugin(),
		// 全局变量声明
		new webpack.DefinePlugin({
			'API_URL': apiUrl,
			'Experience_URL': experienceUrl
		}),
		new HappyPack({
			id: 'happyBabel',
			// 源码编译生成的 Node虚拟模块的数量, 4个是最佳方案。
			threads: happyThreads,
			// 线程池大小
			threadPool: happyThreadPool,
			loaders: [{
				loader: 'babel-loader',
				options: {
					// 将转译结果缓存到文件系统, 文档说 babel-loader 提速至少两倍
					// 默认缓存目录 ./node_modules/.cache/babel-loader/
					cacheDirectory: true,
				}
			}],
		}),
		// happyPack会隐式设置属性transpileOnly为true,并关闭所有错误和警告信息
		// 可以使用fork-ts-checker-webpack-plugin进行类型检查
		// new HappyPack({
		// 	id: 'happyTypeScript',
		// 	threads: 2,
		// 	loaders: [{
		// 		loader: 'ts-loader',
		// 		options: {
		// 			happyPackMode: true
		// 		}
		// 	}]
		// }),
		// 单独进程运行类型检查器（增量检查类型、AST缓存）
		new ForkTsCheckerWebpackPlugin({
			// 确保插件检查语法、语义错误
			checkSyntacticErrors: true
		})
	]
};
