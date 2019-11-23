/*
 * @Author: jweboy
 * @Date: 2019-11-03 11:23:13
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-09 14:23:17
 */

export interface LeftBarState {
  selectedKeys?: string[];
  openKeys?: string[];
}

export interface LeftBarProps {}

export interface LeftBarItem {
  key: string;
  name: string;
  url?: string;
  children?: LeftBarItem[];
  query?: any;
}
