import dayjs from 'dayjs';

export const columns = [
	{
		title: 'ID',
		key: 'id',
		dataIndex: 'id'
	},
	{
		title: '错误信息',
		key: 'message',
		dataIndex: 'message'
	},
	{
		title: '创建时间',
		key: 'createAt',
		dataIndex: 'createAt',
		render(value) {
			return (
				<span>{dayjs(value).format('YYYY-MM-DD  HH:mm:ss')}</span>
			);
		},
	},
];
