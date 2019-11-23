/*
 * @Author: jweboy
 * @Date: 2019-11-02 23:31:28
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-09 11:51:47
 */
import * as React from 'react';

export interface ErrorBoundaryProps {
  child?: React.ReactChildren
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: any | null;
}
