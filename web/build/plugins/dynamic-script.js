/**
 * 将js库动态写入到script标签上
 * 默认只插入到body标签中,此函数不适用cdn加载
 * 
 * @param {Array} scripts 插入的js库集合
 */
function DynamicScript({ assets }) { 
  this.assets = assets
}

DynamicScript.prototype.apply = function (compiler) {
  compiler.hooks.compilation.tap('DynamicScript', (compilation) => {
    compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync(
      'DynamicScript',
      (data, cb) => {
        const assets = this.assets.slice()
        const jsAssets = data.assets.js
        if (!!Array.isArray(assets)) { 
          // 保证所有依赖库前置加载，bundle.js最后加载
          for (let item of assets) {
            jsAssets.unshift(item)
          }
          if (!!cb) { 
            cb(null, data)
          } else {
            return Promise.resolve(data)
          }
        }
        throw 'assets应该是一个数组类型'
      }
    )
  })
}

module.exports = DynamicScript