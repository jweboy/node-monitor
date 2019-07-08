import React, { Component } from 'react';
import { Table } from 'antd';
import { columns } from './config';
import { request } from 'util/request';
import styles from './index.less';

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
	handleClearAllData = () => {
		request.delete('/error-exception').then(() => {
    		this.asyncGetList();
    	});
	}
	handlePreviewExample() {
		window.open('http://jweboy.com/throw-error-example');
	}
	render() {
    	const { data } = this.state;

    	return (
			<div>
				<a className={styles.btn} onClick={this.handlePreviewExample}>预览地址</a>
				<a className={styles.btn} onClick={this.handleClearAllData}>清除数据</a>
				<Table className={styles.table} dataSource={data} columns={columns} rowKey="id" onRow={this.onRow} />
			</div>
    	);
	}
}

export default ErrorExceptionList;
