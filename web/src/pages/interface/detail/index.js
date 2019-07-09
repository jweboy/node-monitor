import React, { Component } from 'react';
import { Icon, Row, Col, Badge, Tag, Breadcrumb } from 'antd';
// import PropTypes from 'prop-types';
// import { withRouter } from "react-router";
// import { format } from 'jweboy-utils/lib/date-time';
import dayjs from 'dayjs';
import { statusMap,  methodColorMap } from '../config';
import styles from './index.less';
import { request } from '../../../util/request';

// @withRouter
class InterfaceDetail extends Component {
    state = {
    	data: {
    		method: '',
    	},
    }
    // static propTypes = {
    // 	data: PropTypes.shape({
    // 		method: PropTypes.string,
    // 		url: PropTypes.string,
    // 		// createAt: PropTypes.string,
    // 		code: PropTypes.number,
    // 		browser: PropTypes.string,
    // 		info: PropTypes.string,
    // 		message: PropTypes.string,
    // 	}),
    // }
    componentDidMount() {
    	this.asyncGetData();
    }
    // componentDidUpdate(prevProps, prevState) {
    //     console.warn(prevProps.match !== this.props.match)
    //     if(prevProps.match !== this.props.match) {
    //         this.asyncGetData()
    //     }
    // }

    asyncGetData() {
    	const { id } = this.props;
    	return request.get(`/interface/${id}`)
    		.then((resp) => {
    			this.setState({ data: resp });
    		});
    }
    render() {
    	const { data } = this.state;
    	const currentStatus = statusMap[data.status];
    	const currMethodColorText = methodColorMap[data.method.toLowerCase()];
    	const isSucceed = data.status === 'succeed';

    	return (
    		<div>
    			{/* <Breadcrumb className={styles.breadcrumb}>
    				<Breadcrumb.Item href="/interface">
    					<Icon type="home" />
    				</Breadcrumb.Item>
    				<Breadcrumb.Item>
    					<span>请求详情</span>
    				</Breadcrumb.Item>
    			</Breadcrumb> */}
    			<div>
    				<h2 className={styles.interfaceTitle}>基本信息</h2>
    				<div className={styles.interfaceInfo}>
    					<Row className={styles.interfaceRow}>
    						<Col span={3}>接口路径：</Col>
    						<Col span={9}>
    							<Tag color={currMethodColorText}>
    								{data.method}
    							</Tag>
    							<span>{data.url}</span>
    						</Col>
    						<Col span={3}>创建时间：</Col>
    						<Col span={9}>{dayjs(data.createAt).format('YYYY-MM-DD HH:mm:ss')}</Col>
    					</Row>
    					<Row className={styles.interfaceRow}>
    						<Col span={3}>状态：</Col>
    						<Col span={9}>
    							<Badge {...currentStatus} />
    						</Col>
    						{
    							isSucceed ? (
    								<div>
    									<Col span={3}>请求时长：</Col>
    									<Col span={9}>
    										{`${parseInt(data.request)}ms`}
    									</Col>
    								</div>
    							) : (
    								<div>
    									<Col span={3}>状态码：</Col>
    									<Col span={9}>{data.code}</Col>
    								</div>
    							)
    						}
    					</Row>
    					<Row className={styles.interfaceRow}>
    						<Col span={3}>浏览器内核：</Col>
    						<Col span={21}>{data.browser}</Col>
    					</Row>
    				</div>
    			</div>
    			{
    				!isSucceed &&
                    <div>
                    	<h2 className={styles.interfaceTitle}>错误信息</h2>
                    	<div className={styles.interfaceInfo}>
                    		<Row className={styles.interfaceRow}>
                    			{data.message}
                    		</Row>
                    	</div>
                    </div>
    			}
    			<div>
    				<h2 className="interface-title">请求参数</h2>
    				<div className="interface-info">
    					<Row className="interface-row">
    						{data.info}
    					</Row>
    				</div>
    			</div>
    		</div>
    	);
    }
}

export default InterfaceDetail;
