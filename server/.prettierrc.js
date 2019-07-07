module.exports = {
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'es5', // { a:1, b:2, } 使用 ES5 支持的拖尾逗号
  arrowParens: 'always', // (x) => x 箭头函数只有一个参数时候始终有括号
  bracketSpacing: true, // {foor:bar} => { foo:bar } 对象文字中始终有空格
  parser: 'babylon' // 解析器
};
