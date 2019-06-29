// import { dateTime } from 'jweboy-utils'
// const { format } = dateTime
import dayjs from 'dayjs';
import { Input, Button, Icon, Tag, Badge } from 'antd';
import Highlighter from 'react-highlight-words';
import './index.css';

const methodColorMap = {
	get: 'green',
	post: 'blue',
};

const statusMap = {
	succeed: {
		status: 'success',
		text: '成功',
	},
	failed: {
		status: 'error',
		text: '失败',
	},
};

const getSearchColumnProps = (ctx) => ({
	filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
		<div className="search">
			<Input
				ref={node => { ctx.searchInput = node; }}
				placeholder="请输入请求地址关键词"
				value={selectedKeys[0]}
				onPressEnter={ctx.handleSearch(selectedKeys, confirm)}
				onChange={ctx.handleSearchInputChange(setSelectedKeys)}
				className="search-input"
			/>
			<Button
				type="primary"
				icon="search"
				size="small"
				className="search-btn"
				onClick={ctx.handleSearch(selectedKeys, confirm)}
			>Search</Button>
			<Button
				size="small"
				className="search-btn"
				onClick={ctx.handleReset(clearFilters)}
			>Reset</Button>
		</div>
	),
	filterIcon: (filtered) => (
		<Icon type="search" color={{ color: filtered && '#1890ff'}} />
	),
	onFilterDropdownVisibleChange: visible => {
		if (visible) {
			// 展开默认选中文本
			setTimeout(() => ctx.searchInput.select());
		}
	},
	render: (text) => (
		<Highlighter
			highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
			searchWords={[ctx.state.filters.keyword]}
			autoEscape
			textToHighlight={text.toString()}
		/>
	),
});

export const resetPage = () => ({ page: 1, size: 10 });

export const statusList = [
	{
		title: '成功',
		value: 'succeed',
	},
	{
		title: '失败',
		value: 'failed',
	}
];

export const getColumns = (ctx) => {
	const { state: { filters }} = ctx;

	const columns = [
		{
			title: '请求方法',
			key: 'method',
			dataIndex: 'method',
			render: (text) => {
				const currentColor = methodColorMap[text.toLowerCase()];

				return <Tag color={currentColor}>{text}</Tag>;
			},
			filters: [
				{
					text: 'GET',
					value: 'GET',
				},{
					text: 'POST',
					value: 'POST',
				}
			],
		},
		{
			title: '状态码',
			key: 'code',
			dataIndex: 'code',
			sorter: (a, b) => a.code - b.code,
		},
		{
			title: '请求路径',
			key: 'url',
			dataIndex: 'url',
			...getSearchColumnProps(ctx),
		},
		{
			title: '请求状态',
			key: 'status',
			dataIndex: 'status',
			render: (text) => {
				const current = statusMap[text];

				return current ? <Badge {...current} /> : '-';
			},
			filters: [
				{
					text: '失败',
					value: 'failed',
				},{
					text: '成功',
					value: 'succeed',
				}
			],
			filtered: filters.status.length > 0,
			filteredValue: filters.status,
		},
		{
			title: '请求时间',
			key: 'request',
			dataIndex: 'request',
			render: (text) => {
				return text ? `${parseInt(text)}ms` : '-';
			},
			sorter: (a, b) => a.request - b.request,
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

	if(filters.status.includes('failed')) {
		return columns.filter((item) => item.key !== 'request');
	}

	return columns;
};
