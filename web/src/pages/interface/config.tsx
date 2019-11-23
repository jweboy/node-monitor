/*
 * @Author: jweboy
 * @Date: 2019-11-02 12:12:53
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-08 22:17:48
 */

import * as React from 'react';
import { ColumnProps, ColumnFilterItem } from 'antd/lib/table';
import { Tag } from 'antd';
import { InterfaceDto } from 'src/types/interface';

const methods = ['GET', 'POST', 'PUT', 'DELETE'];

const methodColors = {
  get: 'green',
  post: 'blue',
  put: 'orange',
  delete: 'red',
};


function getFilters(filters: string[])  {
  return filters.reduce((arr: ColumnFilterItem[], item: string) => {
    arr.push({ text: item, value: item });
    return arr;
  }, []);
}

export const columns: ColumnProps<InterfaceDto>[] = [
  {
    title: '请求方法',
    key: 'method',
    dataIndex: 'method',
    width: 160,
    render(text: string) {
      const currentColor = text != null ?
        methodColors[text.toLowerCase()] :
        '';

      return (
        <Tag color={currentColor}>{text.toUpperCase()}</Tag>
      );
    },
    filters: getFilters(methods),
  },
  {
    title: '状态码',
    key: 'code',
    dataIndex: 'code',
    width: 120,
    sorter: (a, b): number => a.code - b.code,
  },
  {
    title: '请求路径',
    key: 'url',
    dataIndex: 'url',
    width: 360,
    // filterDropdown(props: FilterDropdownProps) {
    //   return (
    //     <Search {...props} />
    //   );
    // },
    // filterIcon: (filtered: boolean) => {
    //   const styles = { color: filtered ? '#1890ff': undefined };
    //   return (
    //     <Icon type="search" style={styles} />
    //   );
    // },
    // onFilter(value, record): boolean {
    //   return true;
    // },
    //   record[dataIndex]
    //     .toString()
    //     .toLowerCase()
    //     .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange(visible: boolean) {
      if (visible) {
        // setTimeout(() => this.searchInput.select());
      }
    },
  },
  {
    title: '请求时间',
    key: 'req_time',
    dataIndex: 'req_time',
    width: 200,
    render(text): string {
      return text ? `${parseInt(text)}ms` : '-';
    },
    sorter: (a, b): number => a.req_time - b.req_time,
  },
  {
    title: '创建时间',
    key: 'create_time',
    dataIndex: 'create_time',
    width: 200,
    // render(value): ReactElement {
    //   return <span>{dayjs(value).format('YYYY-MM-DD  HH:mm:ss')}</span>;
    // },
  },
];

