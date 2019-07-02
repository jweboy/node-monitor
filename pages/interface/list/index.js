import React from 'react';
import { Table } from 'antd';
import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import qs from 'querystringify';
import fetch from 'isomorphic-unfetch';
import { getColumns, resetPage } from '../config';
import Layout from '../../../components/Layout';
import './index.less';

const request = async (url) => {
	const resp = await fetch(url);
	const data = await resp.json();
	return data;
};

class InterfaceList extends React.Component {
	constructor(props) {
		super(props);

		this.onRow = (record) => ({
			onClick: this.handleClick.bind(this, record),
		});
		this.state = {
			filters: {
				status: ['failed'],
				method: '',
				keyword: '',
				...resetPage(),
			},
			list: [],
			total: 0,
		};
	}
	static async getInitialProps() {
		const env = process.env;
		return { env };
	}
    static defaultProps = {
    	list: [],
    }
    static propTypes = {
    	list: PropTypes.array,
    }
    componentDidMount() {
    	this.asyncGetList();
    }
    componentDidUpdate(_, prevState) {
    	if(prevState.filters !== this.state.filters) {
    		this.asyncGetList();
    	}
    }
    asyncGetList() {
    	const { filters } = this.state;
    	const { env } = this.props;

    	// console.warn(env, `${env.SERVER_PROTOCOL}://${env.SERVER_HOST}:${env.SERVER_PORT}/api/list${qs.stringify(filters, true)}`)

    	request(`${env.SERVER_PROTOCOL}://${env.SERVER_HOST}:${env.SERVER_PORT}/api/list${qs.stringify(filters, true)}`)
    		.then((resp) => {
    			this.setState({ ...resp });
    		});
    }
    handleSearchInputChange = (setSelectedKeys) => (evt) => {
    	return setSelectedKeys(evt.target.value ? [evt.target.value] : []);
    }
    handleSearch = (selectedKeys, confirm) => () => {
    	confirm();
    	this.handleFilterChange('keyword', selectedKeys[0] || '');
    }
    handleReset = (clearFilters) => () => {
    	clearFilters();
    	this.handleFilterChange('keyword', '');
    }
    handleClick = (record) => {
    	const { url } = this.props;

    	Router.replace(`${url.asPath}/${record.id}`);
    }
    handleFilterChange = (key, value) => {
    	this.setState((prevState) => ({
    		filters: {
    			...prevState.filters,
    			[key]: value
    		}
    	}));
    }
    handleTableChange = (pagination, filters) => {
    	const { status, method } = filters;
    	const { current, pageSize } = pagination;

    	this.setState((prevState) => ({
    		filters: {
    			...prevState.filters,
    			...(method && { method }),
    			...(status && { status }),
    			page: current,
    			size: pageSize,
    		},
    	}));
    }
    render() {
    	const { list, filters, total } = this.state;
    	const pagination = {
    		defaultCurrent: filters.page,
    		total,
    	};

    	return (
    		<div className="container">
    			<Layout>
    				<Table
    					columns={getColumns(this)}
    					dataSource={list}
    					rowKey="id"
    					onRow={this.onRow}
    					onChange={this.handleTableChange}
    					pagination={pagination}
    				/>
    			</Layout>
    		</div>
    	);
    }
}

export default withRouter(InterfaceList);
