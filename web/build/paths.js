const path = require('path')
const fs = require('fs')

// 项目根目录绝对路径 如: /Users/jweboy/WorkSpace/project/creams-web-new
const appDirectory = fs.realpathSync(process.cwd())

/** 
 * @param {string} relativePath 文件相对路径
 * @returns 基于根目录的完整文件绝对路径
*/
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  appPath: resolveApp('.'),
  appSrc: resolveApp('src'),
  appIndexJs: resolveApp('src/index.js'),
  appVendor: resolveApp('src/vendor.js'),
  appSrcComponents: resolveApp('src/components'),
  appSrcUtil: resolveApp('src/util'),
  apppNodeModules: resolveApp('node_modules'),
  appIndexHtml: resolveApp('index.html'),
  appDist: resolveApp('dist'),
  assetsPath: resolveApp('assets'),
  appDistAssets: resolveApp('dist/assets')
}