/*
 * @Author: jweboy
 * @Date: 2019-11-01 13:28:30
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-22 23:07:53
 */

import React, { FC, useState, useEffect } from 'react';
import { getInterfaceList } from '../../api/interface';
import { Table } from 'antd';
import qs from 'qs';
import { InterfaceDto, InterfaceListQuery } from '../../types/interface';
import { ListPagination } from 'src/types/list';
import { PaginationConfig } from 'antd/lib/pagination';
import { useLocation, useHistory } from 'react-router';
import { columns } from './config';

const initialData: InterfaceDto[] = [];
const initialFilters: InterfaceListQuery = { page: 1, size: 10, status: 'succeed'};
const initialTotal: number = 0;
// const initialLoading: boolean = false;

const InterfaceList: FC = () => {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState(initialFilters);
  const [total, setTotal] = useState(initialTotal);
  // const [loading, setLoading] = React.useState(initialLoading);
  const location = useLocation();
  const history = useHistory();

  const handleClick = (record: InterfaceDto) => () => {
    history.push(`/interface/detail/${record.id}`);
  };

  const onRow = (record: InterfaceDto) => ({
    onClick: handleClick(record),
  });

  // TODO: 继续熟悉 TS， 解决 _filters 的 any 声明
  const handleChange = (pagination: PaginationConfig, _filters: any) => {
    const { pageSize, current } = pagination;
    const _pagination = { page: current, size: pageSize };

    setFilters((prevFilters: InterfaceListQuery) => ({ ...prevFilters, ..._pagination, ..._filters }));
    // setLoading(true);
  };

  // 监听路由变化，更新筛选的 status 属性
  useEffect(() => {
    const { search } = location;
    const query = qs.parse(search, { ignoreQueryPrefix: true });
    const { status } = query;

    setFilters((prevState) => ({
      ...prevState,
      ...initialFilters,
      status,
    }));
  }, [location]);

  // 监听筛选变化发起请求
  useEffect(() => {
    // console.log('filters =>', filters);
    getInterfaceList(filters)
      .then(({ data: { list, total } }) => {
        setData(list);
        setTotal(total);
        // setLoading(false);
      });
  }, [filters]);

  const { page, size } = filters;
  const pagination: ListPagination = {
    total,
    current: page,
    pageSize: size,
  };

  return (
    <div className="interface-list">
      <Table columns={columns} dataSource={data} rowKey="id" onRow={onRow} pagination={pagination} onChange={handleChange} />
    </div>
  );
};

export default InterfaceList;

