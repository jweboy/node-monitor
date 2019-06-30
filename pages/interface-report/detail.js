import React, { Component } from 'react';
import { Descriptions, Button, Icon, Row, Col, Badge, Tag, Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import Router from 'next/router';
// import { format } from 'jweboy-utils/lib/date-time';
import dayjs from 'dayjs';
import { statusMap,  methodColorMap } from './config';
import Layout from '../../components/Layout';
import './index.css';

class InterfaceDetail extends Component {
    static defaultProps = {
    	data: {},
    }
    static propTypes = {
    	data: PropTypes.shape({
    		method: PropTypes.string,
    		url: PropTypes.string,
    		// createAt: PropTypes.string,
    		code: PropTypes.number,
    		browser: PropTypes.string,
    		info: PropTypes.string,
    		message: PropTypes.string,
    	}),
    }
    static async getInitialProps(props) {
    	const { query } = props;

    	return {
    		data: query,
    	};
    }
    render() {
    	const { data } = this.props;
    	const currentStatus = statusMap[data.status];
    	const currMethodColorText = methodColorMap[data.method.toLowerCase()];

    	return (
    		<Layout>
    			<Breadcrumb className="breadcrumb">
    				<Breadcrumb.Item href="/interface/report">
    					<Icon type="home" />
    				</Breadcrumb.Item>
    				<Breadcrumb.Item>
    					<Icon type="user" />
    					<span>请求详情</span>
    				</Breadcrumb.Item>
    			</Breadcrumb>
    			<div>
    				<h2 className="interface-title">基本信息</h2>
    				<div className="interface-info">
    					<Row className="interface-row">
    						<Col span="3">接口路径：</Col>
    						<Col span="9">
    							<Tag color={currMethodColorText}>
    								{data.method}
    							</Tag>
    							<span>{data.url}</span>
    						</Col>
    						<Col span="3">创建时间：</Col>
    						<Col span="9">{dayjs(data.createAt).format('YYYY-MM-DD HH:mm:ss')}</Col>
    					</Row>
    					<Row className="interface-row">
    						<Col span="3">状态：</Col>
    						<Col span="9">
    							<Badge {...currentStatus} />
    						</Col>
    						<Col span="3">状态码：</Col>
    						<Col span="9">{data.code}</Col>
    					</Row>
    					<Row className="interface-row">
    						<Col span="3">浏览器内核：</Col>
    						<Col span="21">{data.browser}</Col>
    					</Row>
    				</div>
    			</div>
    			<div>
    				<h2 className="interface-title">错误信息</h2>
    				<div className="interface-info">
    					<Row className="interface-row">
    						{data.message}
    					</Row>
    				</div>
    			</div>
    			<div>
    				<h2 className="interface-title">请求参数</h2>
    				<div className="interface-info">
    					<Row className="interface-row">
    						{data.info}
    					</Row>
    				</div>
    			</div>
    		</Layout>
    	);
    }
}

export default InterfaceDetail;
