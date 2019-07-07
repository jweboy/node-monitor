const fsExtra = require('fs-extra')
const ora = require('ora')

const paths = require('../paths')

const spinner = ora()

  module.exports = function copyFile(fromDir, toDir) { 
    fsExtra.copy(fromDir, toDir)
      .then(function () {
        spinner.succeed('Copy assets/ successful.')
      })
      .catch(function (err) {
        spinner.error(err)
      })
  }