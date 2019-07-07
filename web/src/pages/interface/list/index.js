import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import qs from 'querystringify';
// import { withRouter } from "react-router";
// import fetch from 'isomorphic-unfetch';
// import dynamic from 'next/dynamic';
import { getColumns, resetPage } from '../config';
// import Layout from '../../../components/Layout';
import {request} from '../../../util/request';
import './index.less';
import InterfaceDetailPage from 'pages/interface/detail';
import { Route } from 'react-router-dom';

// @withRouter
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

    	request.get(`/interface${qs.stringify(filters, true)}`)
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
    	const { navigate } = this.props;

    	console.warn(this.props);

    	navigate(`/interface/${record.id}`);
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
    		<div>
    			<Table
    				columns={getColumns(this)}
    				dataSource={list}
    				rowKey="id"
    				onRow={this.onRow}
    				onChange={this.handleTableChange}
    				pagination={pagination}
    			/>
    		</div>
    	);
    }
}

export default InterfaceList;
