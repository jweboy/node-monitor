/*
 * @Author: jweboy
 * @Date: 2019-11-23 14:03:03
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-23 14:16:54
 */
/**
 * @description 规则数值含义
 * "off" 或 0 - 关闭规则
 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
 */

module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    'prettier'
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
        "experimentalObjectRestSpread": true,
    },
    "sourceType": "module"
  },
  "plugins": [
    "prettier"
  ],
  "rules": {
    "indent": ["error", 2], // 2 个空格缩进
    "comma-dangle": [2, "always-multiline"], // 拖尾逗号
    "semi": ["error", "always"], // 使用分号
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
  }
}
