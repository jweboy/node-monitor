import React, { Component } from 'react';
import { Table } from 'antd';
import { columns } from './config';
import { request } from 'util/request';

class ErrorExceptionList extends Component {
	constructor(props) {
		super(props);

		this.onRow = (record) => ({
			onClick: this.handleRowClick.bind(this, record),
		});

		this.state = {
			data: [],
		};
	}
	componentDidMount() {
    	this.asyncGetList();
	}
	asyncGetList() {
    	request.get('/error-exception').then((resp) => {
    		this.setState({
    			data: resp,
    		});
    	});
	}
	handleRowClick(record) {
		const { navigate } = this.props;

		navigate(`/error-exception/${record.id}`);
	}
	render() {
    	const { data } = this.state;

    	return (
			<Table dataSource={data} columns={columns} rowKey="id" onRow={this.onRow} />
    	);
	}
}

export default ErrorExceptionList;
