/*
 * @Author: jweboy
 * @Date: 2019-11-01 23:21:05
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-09 13:20:47
 */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import ErrorBoundary from './components/error-boundary';

// 获取装载组件的根节点
const mountNode = document.getElementById('root');

// 定义根组件渲染的函数
const rootRender = (Component) => {
  render(
    <ErrorBoundary>
      <BrowserRouter basename="/monitor">
        <Component />
      </BrowserRouter>
    </ErrorBoundary>,
    mountNode,
  );
};

rootRender(App);

// FIXME: react-hot-loader@latest不需要这个判断了
// if (module.hot) {
//   module.hot.accept('./routes', () => {
//     rootRender(App)
//   })
// }
