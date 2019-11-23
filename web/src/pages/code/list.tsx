import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Table } from 'antd';
import { columns } from './config';
import { CodeDto } from 'src/types/code';
import { getCodeList } from '../../api/code';

const initialData: CodeDto[] = [];

const CodeList = () => {
  const [data, setData] = useState(initialData);
  const history = useHistory();

  const handleClick = (record: CodeDto) => () => {
    history.push(`/code/detail/${record.id}`);
  };

  const onRow = (record: CodeDto) => ({
    onClick: handleClick(record),
  });

  useEffect(() => {
    getCodeList()
      .then(({ data: { list } }) => {
        setData(list);
      });
  }, []);

  return (
    <Table rowKey="id" columns={columns} dataSource={data} onRow={onRow}/>
  );
};

export default CodeList;
