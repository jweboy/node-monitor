// const execSync = require('child_process').execSync
// const opn = require('opn')

// const OSX_CHROME = 'google chrome'

// function OpenBrowser() {

// }

// OpenBrowser.prototype.apply = function (compiler) {
//   compiler.hooks.afterEmit.tap('OpenBrowser', function (compiler, cb) { 
    
//     function startBrowserProcess(browser = OSX_CHROME, url = 'http://127.0.0.1:9000') { 
//       console.log(process.platform);
//       const shouldTryOpenChromeWithScript = process.platform === 'darwin' &&
//         (typeof browser === 'string' && browser === OSX_CHROME)
      
//       if (shouldTryOpenChromeWithScript) { 
//         execSync('ps cax | grep "Google Chrome"')
//         // execSync(`osascript openChrome.applescript "${encodeURI(url)}"`, {
//         //   cwd: __dirname,
//         //   stdio: 'ignore'
//         // })
//         // return true
//       }

//       opn(url).catch()
//     }
    
//     function openBrowser(undefined, url) {
//       startBrowserProcess(url)
//     }
//     openBrowser()
//     // cb()
//   })
// }

// module.exports = OpenBrowser