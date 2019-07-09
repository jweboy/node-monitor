const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.config');
const DynamicScript = require('./plugins/dynamic-script');
const OpenBrowser = require('./plugins/open-browser');
const webpackDevServer = require('./webpackDevServer.config');
const manifest = require('../dist/dll/vendor-manifest.json');
const { dynamicScripts  } = require('../config');
const env = require('../config/dev.env');
const paths = require('./paths');

// const dashboard = new Dashboard()
const publicPath = '/';
const pathsToClean = ['dist'];

module.exports = merge(baseWebpackConfig, {
	// 编译模式
	mode: env.NODE_ENV,
	// 开发环境这个模式更快
	devtool: 'cheap-module-source-map',
	// 输出目录
	output: {
		// 在bundle中引入所包含模块信息的相关注释
		pathinfo: true,
		// 文件保存在 WebpackDevServer 的虚拟内存中
		filename: 'static/js/[name].[hash].js',
		// 文件代码拆分
		chunkFilename: 'static/js/[name].[chunkhash].js',
		// 静态资源目录,一般指向 '/'
		publicPath,
	},
	devServer: webpackDevServer({ publicPath }),
	module: {
		rules: [
			// 解析node_modules里的css文件
			{
				test: /\.css$/,
				include: paths.apppNodeModules,
				exclude: paths.appSrc,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/,
				exclude: paths.apppNodeModules,
				include: paths.appSrc,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: true, // 开启 CSS Modules
							sourceMap: true, // 开启 sourceMap
							camelCase: true, // 支持驼峰 .active-btn => activeBtn
							localIdentName: '[local]-[hash:base64:5]'
						}
					},
					{
						loader: 'less-loader',
					}
				]
			},
		]
	},
	plugins: [
		// 热加载模块
		new webpack.HotModuleReplacementPlugin(),
		// 热加载显示模块的相对路径
		new webpack.NamedModulesPlugin(),
		// 自动删除dist等目录
		new CleanWebpackPlugin(pathsToClean),
		// index.html插件
		new HtmlWebpackPlugin({
			title: 'node-monitor',
			template: paths.appIndexHtml,
		}),
		// 打包时在动态链接库查找导入的模块
		// 如果存在直接从动态库中获取，无需重复打包
		// new webpack.DllReferencePlugin({
		// 	manifest
		// }),
		// 动态写入脚本集合
		// new DynamicScript({
		// 	assets: dynamicScripts
		// }),
		// new OpenBrowser({})
		// webpack运行详细记录面板
		// new DashboardPlugin(dashboard.setData)
	],
	// 开发环境关闭性能提示
	performance: {
		hints: false
	}
});
