import React, { Component } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import { columns } from './config';

export class InterfacePerformance extends Component {
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
    render() {
    	const { data } = this.props;

    	return (
    		<div>

    			<Layout>
    				<Table dataSource={data} columns={columns} rowKey="id" />
    			</Layout>
    		</div>
    	);
    }
}

export default InterfacePerformance;
