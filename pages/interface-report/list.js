import React from 'react';
import { Table } from 'antd';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { columns } from './config';
import Layout from '../../components/Layout';

class APIPage extends React.Component {
	constructor(props) {
		super(props);

		this.onRow = (record) => ({
			onClick: this.handleClick.bind(this, record),
		});
	}
    static defaultProps = {
    	data: [],
    }
    static propTypes = {
    	data: PropTypes.array,
    }
    static async getInitialProps(props) {
    	const { query } = props;

    	return {
    		data: query,
    	};
    }
    handleClick = (record) => {
    	/* eslint-disable */
    	const { url } = this.props;

    	Router.replace(`${url.asPath}/${record.id}`);
    }
    render() {
    	const { data } = this.props;
    	// console.table(data);

    	return (
    		<div className="container">
                <Layout>
				    <Table columns={columns} dataSource={data} rowKey="id" onRow={this.onRow} />
                </Layout>
    		</div>
    	);
    }
}

export default APIPage;
