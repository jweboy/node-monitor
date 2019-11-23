import { PaginationProps } from 'antd/lib/pagination';

/*
 * @Author: jweboy
 * @Date: 2019-11-05 20:09:17
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-08 21:35:25
 */

export interface ListResponse {
  list: any[];
  total: number;
}

export interface ListPagination extends PaginationProps{ }
