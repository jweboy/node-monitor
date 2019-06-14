import React, { Component } from 'react';
import { Descriptions, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import Router from 'next/router';
// import { format } from 'jweboy-utils/lib/date-time';
import dayjs from 'dayjs';
import './index.css';

const DescriptionItem = Descriptions.Item;

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
    handleBackBtnClick() {
    	Router.back();
    }
    render() {
    	const { data } = this.props;
    	return (
    		<div className="container">
    			<Button onClick={this.handleBackBtnClick}>
    				<Icon type="left" />
    				<span>back</span>
    			</Button>
    			<Descriptions title="细节说明" className="detail" bordered>
    				<DescriptionItem label="请求方法">{data.method}</DescriptionItem>
    				<DescriptionItem label="状态码">{data.code}</DescriptionItem>
    				<DescriptionItem label="请求路径">{data.url}</DescriptionItem>
    				{/* <DescriptionItem label="创建时间">{format(data.createAt, 'time').fmtData}</DescriptionItem> */}
    				<DescriptionItem label="创建时间">{dayjs(data.createAt).format('YYYY-MM-DD HH:mm:ss')}</DescriptionItem>
    				<DescriptionItem label="浏览器">
    					<div className="browser">{data.browser}</div>
    				</DescriptionItem>
    				<DescriptionItem label="请求参数">{data.info}</DescriptionItem>
    				<DescriptionItem label="错误信息" className="message">
    					<div className="message">{data.message}</div>
    				</DescriptionItem>
    			</Descriptions>
    		</div>
    	);
    }
}

export default InterfaceDetail;
