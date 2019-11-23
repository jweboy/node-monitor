<!--
 * @Author: jweboy
 * @Date: 2019-11-01 23:21:05
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-02 23:42:27
 -->
typescript配置文件部分参数说明，具体参考[官网]。(https://www.tslang.cn/docs/handbook/compiler-options.html)

- moduleResolution 决定如何处理模块
- lib 编译过程中需要引入的库文件的列表
- forceConsistentCasingInFileNames 禁止对同一个文件的不一致的引用
- noImplicitReturns 不是函数的所有返回路径都有返回值时报错
- noImplicitThis 当 this表达式的值为 any类型的时候，生成一个错误
- noImplicitAny 在表达式和声明上有隐含的 any类型时报错
- strictNullChecks 在严格的 null检查模式下， null和 undefined值不包含在任何类型里，只允许用它们自己和 any来赋值（有个例外， undefined可以赋值到 void)
- suppressImplicitAnyIndexErrors 阻止 --noImplicitAny对缺少索引签名的索引对象报错。查看 issue #1232了解详情。
- noUnusedLocals 若有未使用的局部变量则抛错
- // TODO: 样式按需加载
