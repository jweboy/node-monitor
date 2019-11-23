/*
 * @Author: jweboy
 * @Date: 2019-11-09 14:30:38
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-09 22:00:46
 */
import * as React from 'react';
import Loadable, { LoadingComponentProps } from 'react-loadable';
import { Spin } from 'antd';

function Loading({ error }: LoadingComponentProps) {
  if (error) {
    return error;
  }

  return <Spin />;
}

export const InterfaceList = Loadable({
  loader: () => import(/* webpackChunkName: 'interfaceList' */ '../pages/interface/list'),
  loading: Loading,
});


export const InterfaceDetail = Loadable({
  loader: () => import(/* webpackChunkName: 'interfaceDetail' */ '../pages/interface/detail'),
  loading: Loading,
});

export const CodeList = Loadable({
  loader: () => import(/* webpackChunkName: 'codeList'*/ '../pages/code/list'),
  loading: Loading,
});

export const CodeDetail = Loadable({
  loader: () => import(/* webpackChunkName: 'codeDetail'*/ '../pages/code/detail'),
  loading: Loading,
});
