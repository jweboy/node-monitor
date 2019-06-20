import dayjs from 'dayjs';
import { Tag } from 'antd';

const methodColorMap = {
	get: 'green',
	post: 'blue',
};

export const columns = [
	{
		title: '请求方法',
		key: 'method',
		dataIndex: 'method',
		render: (text) => {
			const currentColor = methodColorMap[text.toLowerCase()];

			return <Tag color={currentColor}>{text}</Tag>;
		}
	},
	{
		title: '请求路径',
		key: 'url',
		dataIndex: 'url',
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
	}
];
