/*
 * @Author: jweboy
 * @Date: 2019-11-01 23:21:05
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-17 10:22:51
 */
/**
 * @description 规则数值含义
 * "off" 或 0 - 关闭规则
 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
 */

module.exports = {
  "env": {
    browser: true,
    es6: true,
    node: true,
  },
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended", // 增加eslint-plugin-react扩展
  ],
  "parser": "babel-eslint",
  "parserOptions": {
      "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "jsx": true
      },
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "rules": {
    "indent": ["error", 2], // 2 个空格缩进
    "comma-dangle": [2, "always-multiline"], // 拖尾逗号
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "always"
      ],
      // react rules部分
      // 参考地址 https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules
      "react/display-name": [
          1,
          {
            "ignoreTranspilerName": false
          }
        ],
        "react/forbid-prop-types": [
          1,
          {
            "forbid": [
              "any"
            ]
          }
      ],
      // <A bool={true} /> => <A bool />
      "react/jsx-boolean-value": 2,
      // 组件多属性格式缩进
      "react/jsx-closing-bracket-location": 2,
      // 多余空格的缩进问题 => name={ test}
      "react/jsx-curly-spacing": 2,
      // 属性前两个空格缩进
      // "react/jsx-indent-props": 0,
      // 数组渲染的列表必须带有key
      "react/jsx-key": 2,
      // "react/jsx-max-props-per-line": 0,
      // 绑定事件不推荐用bind
      "react/jsx-no-bind": [1, {
          "allowBind": false, // 不支持bind函数
          "ignoreRefs": true, // ref支持剪头函数 => ref={node => { this.node = node; }}
          "allowFunctions": false, // 不支持 <span onClick={function () { ... }} />
          "allowArrowFunctions": true, // 可以使用 <span onClick={() => { ... }} />,但尽量不推荐使用
      }],
      // 不允许props属性重复定义 => <Hello name="John" name="John" />
      "react/jsx-no-duplicate-props": 2,
      // "react/jsx-no-literals": 0,
      // 查未定义的变量等
      "react/jsx-no-undef": 2,
      // 组件类名大驼峰规范 => 错误范例: <Test_component /> <TEST_COMPONENT />
      "react/prop-types": 0,
      "react/jsx-pascal-case": 2,
      "react/jsx-sort-prop-types": 0,
      "react/jsx-sort-props": 0,
      "react/jsx-uses-react": 1,
      "react/jsx-uses-vars": 1,
      "react/no-danger": 1,
      "react/no-did-mount-set-state": 1,
      "react/no-did-update-set-state": 1,
      "react/no-direct-mutation-state": 1,
      "react/no-multi-comp": 1,
      "react/no-set-state": 0,
      "react/no-unknown-property": 1,
      "react/prefer-es6-class": 1,
    "react/react-in-jsx-scope": 1,

  }
}
