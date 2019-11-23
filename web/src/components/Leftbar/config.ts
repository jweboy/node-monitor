import { LeftBarItem } from 'src/types/leftbar';

/*
 * @Author: jweboy
 * @Date: 2019-11-02 11:35:37
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-09 21:29:44
 */

export const menu: LeftBarItem[] = [
  {
    key: 'interface',
    name: '请求接口',
    url: '/interface/list',
    children: [
      {
        key: 'succeed',
        name: '请求成功',
        query: { status: 'succeed' },
      },
      {
        key: 'failed',
        name: '请求异常',
        query: { status: 'failed' },
      },
    ],
  },
  {
    key: 'code',
    url: '/code/list',
    name: '逻辑代码',
  },
  {
    key: 'page',
    url: '/page',
    name: '页面性能',
  },
  {
    key: 'process',
    url: '/process',
    name: 'Node进程',
  },
];
