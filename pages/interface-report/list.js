import React from 'react';
import { Table, Input } from 'antd';
import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import qs from 'querystringify';
import fetch from 'isomorphic-unfetch';
import { getColumns } from './config';
import Layout from '../../components/Layout';
import './index.css';

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
			},
			list: [],
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
    	// console.warn('request =>', filters);

    	request(`http://localhost:4004/api/list${qs.stringify(filters, true)}`)
    		.then((list) => {
    			this.setState({ list });
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

    	this.setState((prevState) => ({
    		filters: {
    			...prevState.filters,
    			...(method && { method }),
    			...(status && { status }),
    		},
    	}));
    }
    render() {
    	const { list } = this.state;

    	return (
    		<div className="container">
    			<Layout>
				    <Table columns={getColumns(this)} dataSource={list} rowKey="id" onRow={this.onRow} onChange={this.handleTableChange} />
    			</Layout>
    		</div>
    	);
    }
}

export default withRouter(InterfaceList);
