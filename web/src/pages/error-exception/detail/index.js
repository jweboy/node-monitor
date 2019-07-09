import React, { Component } from 'react';
import { Alert } from 'antd';
import styles from './index.less';
import { request } from 'util/request';

// const BreadcrumbItem = Breadcrumb.Item;

class ErrorExceptionDetail extends Component {
    state = {
    	data: {
    		message: '--'
    	},
    }
    componentDidMount() {
    	this.asyncGetData();
    }
    asyncGetData() {
    	const { id } = this.props;

    	return request.get(`/error-exception/${id}`)
    		.then((resp) => {
    			this.setState({ data: resp });
    		});
    }
    render() {
    	const { data } = this.state;

    	return (
    		<div>
    			{/* <Breadcrumb className="breadcrumb">
    				<BreadcrumbItem href="/error-exception">
    					<Icon type="home" />
    				</BreadcrumbItem>
    				<BreadcrumbItem>
    					<span>代码异常详情</span>
    				</BreadcrumbItem>
    			</Breadcrumb> */}
    			<div>
    				<Alert showIcon type="error" message={data.message} />
    				<h3>{data.source}</h3>
    				{/* <h4>{data.url}</h4> */}
    				{data.sourceContent && data.sourceContent.split('\n').map((text, index) => (
    					<div key={index}>
    						<pre className={data.lineNo === index + 1 ? styles.error : ''}>
    							<span>{index + 1}.</span>
    							<span>{text}</span>
    						</pre>
    					</div>
    				))}
    			</div>
    		</div>
    	);
    }
}

export default ErrorExceptionDetail;
