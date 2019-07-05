import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Table } from 'antd';
import dynamic from 'next/dynamic';
import { columns } from './config';
import request from '../../request';

const Layout = dynamic(() => import('../../../components/Layout'));

@withRouter
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
	static async getInitialProps() {
		const env = process.env;
		return { env };
	}
	componentDidMount() {
    	this.asyncGetList();
	}
	asyncGetList() {
    	const { env } = this.props;
    	request(`${env.SERVER_PROTOCOL}://${env.SERVER_HOST}:${env.SERVER_PORT}/api/error-exception/list`).then((resp) => {
    		this.setState({
    			data: resp,
    		});
    	});
	}
	handleRowClick(record) {
		const { router } = this.props;

		router.push(`/error-exception/${record.id}`);
	}
	render() {
    	const { data } = this.state;

    	return (
    		<Layout>
    			<Table dataSource={data} columns={columns} rowKey="id" onRow={this.onRow} />
    		</Layout>
    	);
	}
}

export default ErrorExceptionList;
