
import { ColumnProps } from 'antd/lib/table';
import { CodeDto } from 'src/types/code';
// import dayjs from 'dayjs';

export const columns: ColumnProps<CodeDto>[] = [
  {
    title: 'ID',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: '错误信息',
    key: 'message',
    dataIndex: 'message',
  },
  {
    title: '创建时间',
    key: 'create_time',
    dataIndex: 'create_time',
    // render(value) {
    //   return (
    //     <span>{dayjs(value).format('YYYY-MM-DD  HH:mm:ss')}</span>
    //   );
    // },
  },
];
